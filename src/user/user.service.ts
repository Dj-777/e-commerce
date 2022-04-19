/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
//import { AuthLoginDto } from 'src/components/authlogin.dto';
import { RegisterUserDto } from 'src/user/components/userRegister.dto';
//import { LogInUsers } from 'src/entity/LoginUser.entity';
import { User } from 'src/user/entity/user.entity';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  //Register User
  async RegisterUser(registeruserdto: RegisterUserDto) {
    const checkemail = await this.userRepository.findOne({
      where: { Email: registeruserdto.Email },
    });
    if (checkemail) {
      return 'you are already registred with this email';
    } else {
      const user = await this.userRepository.create(registeruserdto);
      await this.userRepository.save(user);
      return { Message: 'You have registered successfully' };
    }
  }

  async getOne(Email: string) {
    return this.userRepository.findOne({where: {Email: Email}});
}

  //Register User

  //LOGIN
  //   async login(authLoginDto: AuthLoginDto) {
  //     const user = await this.validateUser(authLoginDto);
  //     const payload = `${user.id}`;
  //     const access_Token = this.jwtService.sign(payload);
  //     if (await LogInUsers.findOne({ where: { Email: authLoginDto.Email } })) {
  //       const UpdateuserLoginAccessToken = await getConnection()
  //         .createQueryBuilder()
  //         .update(LogInUsers)
  //         .set({
  //           access_token: access_Token,
  //         })
  //         .where('Email = :Email', { Email: authLoginDto.Email })
  //         .execute();
  //       return `${access_Token}You Are Already Login Into System `;
  //     } else {
  //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //       const saveusertologin = await getConnection()
  //         .createQueryBuilder()
  //         .insert()
  //         .into(LogInUsers)
  //         .values({
  //           Email: authLoginDto.Email,
  //           access_token: access_Token,
  //         })
  //         .execute();
  //       return {
  //         Yourdata: `${authLoginDto.Email} and ${authLoginDto.Password}`,
  //         access_token: access_Token,
  //       };
  //     }
  //   }
  //   async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
  //     const { Email, Password } = authLoginDto;
  //     const user = await User.findOne({ where: { Email: Email } });
  //     if (!(await user?.ValidatePassword(Password))) {
  //       throw new UnauthorizedException();
  //     }
  //     return user;
  //   }
  //LOGIN

  // //LOGOUT
  // async Logout(authlogin: AuthLoginDto) {
  //   if (await LogInUsers.findOne({ where: { Email: authlogin.Email } })) {
  //     const DeleteLoginUSer = await getConnection()
  //       .createQueryBuilder()
  //       .delete()
  //       .from(LogInUsers, 'LoginUser')
  //       .where('LoginUser.Email=:Email', { Email: authlogin.Email })
  //       .execute();
  //     return `${authlogin.Email} You Have Logout Successfully...`;
  //   } else {
  //     return `${authlogin.Email} You Have To Login First`;
  //   }
  // }
  // //LOGOUT
}
