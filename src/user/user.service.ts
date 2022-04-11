import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from 'src/components/authlogin.dto';
import { RegisterUserDto } from 'src/components/userregister.dto';
import { User } from 'src/entity/user.entity';
import { getConnection } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';

export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerSevice: MailerService,
  ) {}
  //Register User
  async RegisterUser(registeruserdto: RegisterUserDto) {
    const checkemail = await User.findOne({
      where: { Email: registeruserdto.Email },
    });
    if (checkemail) {
      return 'you are already registred with this email';
    } else {
      const user = User.create(registeruserdto);
      await User.save(user);
      return user;
    }
  }
  //Register User

  //LOGIN
  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);
    console.log(this.jwtService);
    const payload = `${user.id}`;
    console.log({ payload });
    const Access_Token = this.jwtService.sign(payload);
    console.log(Access_Token);
    //const access_Token = this.jwtService.sign(payload);
    // console.log(access_Token);
    // // if (await User.findOne({ where: { Email: authLoginDto.Email } })) {
    //   const UpdateuserLoginAccessToken = await getConnection()
    //     .createQueryBuilder()
    //     .update(User)
    //     .set({
    //       Access_Token: access_Token,
    //     })
    //     .where('Email = :Email', { Email: authLoginDto.Email })
    //     .execute();
    //   return {
    //     Yourdata: `${authLoginDto.Email} and ${authLoginDto.Password}`,
    //     access_token: access_Token,
    //   };
    //   // return 'You Are Already Loged Into System Please Make Sure You Logout First Before Login Again';
    // } else {
    //   const saveusertologin = await getConnection()
    //     .createQueryBuilder()
    //     .update(User)
    //     .set({
    //       Access_Token: access_Token,
    //     })
    //     .where('Email = :Email', { Email: authLoginDto.Email })
    //     .execute();
    //   return {
    //     Yourdata: `${authLoginDto.Email} and ${authLoginDto.Password}`,
    //     access_token: access_Token,
    //   };
    // }
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

  //Forget-Password
  async ForgetPassword(Email) {
    const checkemail = await User.findOne({ where: { Email: Email.Email } });
    if (checkemail) {
      const payload = `${checkemail.id}`;
      const access_Token = this.jwtService.sign(payload);

      //const url=`http://localhost:3000/user/Forgetpassword?Token=${access_Token}`;

      await this.mailerSevice.sendMail({
        to: Email.Email,
        subject: 'Reset Password Link',
        text: `http://localhost:3000/user/ResetPassword?Token=${access_Token}`,
      });
      //return `You Are Here`;
    } else {
      return `Message:You Need to Register First...`;
    }
  }

  //Forget-Password
}
