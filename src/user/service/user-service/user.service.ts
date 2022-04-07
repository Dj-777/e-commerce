/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/model/user.entity';
import { UserI } from 'src/user/model/user.interface';
import { Like, Repository } from 'typeorm';
import { AuthService } from 'src/auth/service/auth.service';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,

  ) { }

  async create(newUser: UserI): Promise<UserI> {
    try {
      const exists: boolean = await this.mailExists(newUser.email);
      if (!exists) {
        const passwordHash: string = await this.hashPassword(newUser.password);
        newUser.password = passwordHash;
        const user = await this.userRepository.save(
          this.userRepository.create(newUser),
        );
        return this.findOne(user.email);
      } else {
        throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
      }
    } catch {
      throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
    }
  }





  async login(user: UserI): Promise<string> {
    try {
      const foundUser: UserI = await this.findByEmail(user.email.toLowerCase());
      if (foundUser) {
        const matches: boolean = await this.validatePassword(
          user.password,
          foundUser.password,
        );
        if (matches) {
          const payload: UserI = await this.findOne(foundUser.email);
          return this.authService.generateJwt(payload);
        } else {
          throw new HttpException(
            'Login was not successfull, wrong credentials',
            HttpStatus.UNAUTHORIZED,
          );
        }
      } else {
        throw new HttpException(
          'Login was not successfull, wrong credentials',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }



  async findAll(user: UserI): Promise<UserI[]> {
    return this.userRepository.find(user)
  }

  async findAllByUsername(username: string): Promise<UserI[]> {
    return this.userRepository.find({
      where: {
        username: Like(`%${username.toLowerCase()}%`),
      },
    });
  }

  async forgetPassword(user: UserI): Promise<string> {
    const foundUser: UserI = await this.findByEmail(user.email.toLowerCase());

    if (foundUser) {
      const payload: UserI = await this.findOne(foundUser.email);
      return this.authService.generateJwt(payload);
    }
  }

  async updatePassword(email: string, user: UserI): Promise<any> {
    delete user.email;
    delete user.username;

    const hash: string = await this.authService.hashPassword(user.password);

    user.password = hash
    return from(this.userRepository.update(email, user)).pipe(
      switchMap(() => this.findOne(email)),
    );
  }

  async logout(user: UserI): Promise<string> {
    const veryfy: UserI = await this.findByEmail(user.email.toLowerCase());
    if (veryfy) {
      let payload: UserI = await this.findOne(veryfy.email);
      payload = null;
      return this.authService.generateJwt(payload);
    }
  }



  private async findByEmail(email: string) {
    return this.userRepository.findOne(
      { email },
      { select: ['id', 'email', 'username', 'password'] },
    );
  }

  private async hashPassword(password: string): Promise<string> {
    return this.authService.hashPassword(password);
  }

  private async validatePassword(
    password: string,
    storedPasswordHash: string,
  ): Promise<any> {
    return this.authService.comparePasswords(password, storedPasswordHash);
  }

  async findOne(email: string): Promise<UserI> {
    return this.userRepository.findOne({ email });
  }

  public getOne(id: number): Promise<UserI> {
    return this.userRepository.findOneOrFail({ id });
  }

  private async mailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
