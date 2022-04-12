import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from 'src/components/authlogin.dto';
import { RegisterUserDto } from 'src/components/userregister.dto';
import { LogInUsers } from 'src/entity/LoginUser.entity';
import { User } from 'src/entity/user.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly jwtService: JwtService) {}
  //Register User
  async RegisterUser(registeruserdto: RegisterUserDto) {
    const checkemail = await User.findOne({
      where: { Email: registeruserdto.Email },
    });
    if (checkemail) {
      return { Message: 'you are already registred with this email' };
    } else {
      const user = User.create(registeruserdto);
      await User.save(user);
      if (user.save) {
        return { status: true, Message: 'You have registered successfully' };
      } else {
        return {
          status: false,
          Message: 'You have not registered successfully',
        };
      }
    }
  }
  //Register User

  //LOGIN
  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);
    const payload = `${user.id}`;
    const access_Token = this.jwtService.sign(payload);
    if (await LogInUsers.findOne({ where: { Email: authLoginDto.Email } })) {
      const UpdateuserLoginAccessToken = await getConnection()
        .createQueryBuilder()
        .update(LogInUsers)
        .set({
          access_token: access_Token,
        })
        .where('Email = :Email', { Email: authLoginDto.Email })
        .execute();
      return `You Are Already Login Into System
      Email_verify:true,
      Accesstoken= ${access_Token} and ${authLoginDto.Email}`;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const saveusertologin = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(LogInUsers)
        .values({
          Email: authLoginDto.Email,
          access_token: access_Token,
        })
        .execute();
      return {
          Email_verify:true,
        Yourdata: `${authLoginDto.Email} `,
        access_token: access_Token,
      };
    }
  }
  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { Email, Password } = authLoginDto;
    const user = await User.findOne({ where: { Email: Email } });
    if (!(await user?.ValidatePassword(Password))) {
      throw new UnauthorizedException();
    }
    return user;
  }
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
