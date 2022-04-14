import { MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from 'src/components/authlogin.dto';
import { forgetPasswordDto } from 'src/components/Forgetpasswor.dto';
import { RegisterUserDto } from 'src/components/userregister.dto';
import { User } from 'src/entity/user.entity';
import { getConnection } from 'typeorm';
import * as bcrypt from 'bcryptjs';
@Injectable()
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
      return { message: 'you are already registred with this email' };
    } else {
      const user = User.create(registeruserdto);
      await User.save(user);
      if (user.save) {
        return { status: true, message: 'You have registered successfully' };
      } else {
        return {
          status: false,
          message: 'You have not registered successfully',
        };
      }
    }
  }
  //Register User

  //LOGIN
  async login(authLoginDto: AuthLoginDto) {
    if (await User.findOne({ where: { Email: authLoginDto.Email } })) {
      const user: User = await this.validateUser(authLoginDto);
      const payload = `${user.id}`;
      const access_Token = this.jwtService.sign(payload);

      user.Access_Token = access_Token;
      await user.save();
      return {
        Email_verify: true,
        access_Token: access_Token,
        Email: authLoginDto.Email,
      };
      // const UpdateuserLoginAccessToken = await getConnection()
      //   .createQueryBuilder()
      //   .update(LogInUsers)
      //   .set({
      //     access_token: access_Token,
      //   })
      //   .where('Email = :Email', { Email: authLoginDto.Email })
      //   .execute();
    } else {
      return { message: 'Email is not registred, do you want to registred?' };
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

  //forgetPassword
  async ForgetPassword(Email) {
    const checkemail = await User.findOne({ where: { Email: Email.Email } });
    if (checkemail) {
      const payload = `${checkemail.id}`;
      const access_Token = this.jwtService.sign(
        { payload: checkemail.id },

        { expiresIn: '600s' },
      );
      //const url=`http://localhost:3000/user/Forgetpassword?Token=${access_Token}`;

      const sendMails = await this.mailerSevice.sendMail({
        to: Email.Email,
        subject: 'Reset Password Link',
        text: `Click here for reset password-http://localhost:3000/resetpassword?Token=${access_Token}`,
      });

      if (sendMails) {
        return {
          status: true,
          message: 'Email has been sent, please check your inbox.',
        };
      } else {
        return {
          message: 'Something went wrong ',
        };
      }
      //return `You Are Here`;
    } else {
      return { message: 'You Need to Register First...' };
    }
  }
  //forgetPassword
  async Forgetpasswordaftergetmail(forgetpasswordto: forgetPasswordDto) {
    const check_accesstoken: { payload: number; exp: number } =
      this.jwtService.verify(forgetpasswordto.access_token);
    console.log(check_accesstoken.exp);
    if (forgetpasswordto.Password === forgetpasswordto.conformPassword) {
      const datenow = new Date();
      if (check_accesstoken.exp < datenow.getTime() / 1000) {
        return new NotFoundException('Link is expired');
      } else {
        if (check_accesstoken.payload) {
          const getdatafromaccesstoken = await User.findOne({
            where: { id: check_accesstoken.payload },
          });

          if (getdatafromaccesstoken) {
            if (
              !(await getdatafromaccesstoken?.ValidatePassword(
                forgetpasswordto.conformPassword,
              ))
            ) {
              forgetpasswordto.conformPassword = await bcrypt.hash(
                forgetpasswordto.conformPassword,
                8,
              );
              getdatafromaccesstoken.Password =
                forgetpasswordto.conformPassword;
              const successchange = await getdatafromaccesstoken.save();
              delete forgetpasswordto.access_token;
              if (successchange) {
                
                return {status: true, message: 'Password is succuessfully change' };
              } else {
                return { message: 'Something went wrong ' };
              }
            } else {
              return { message: 'You dont use previous password' };
            }
          } else {
            return { message: 'Your data is not get' };
          }
        } else {
          return { message: 'You have to enter correct accesstoken' };
        }
      }
    } else {
      return { message: 'Password and conform passsword are not same' };
    }
  }

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
