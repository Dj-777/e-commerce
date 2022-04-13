import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { AuthLoginDto } from 'src/components/authlogin.dto';
import { forgetPasswordDto } from 'src/components/Forgetpasswor.dto';
import { RegisterUserDto } from 'src/components/userregister.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userservices: UserService) {}

  @Post('register')
  async RegisterUser(@Body() registeruserdto: RegisterUserDto) {
    return await this.userservices.RegisterUser(registeruserdto);
  }
  //LOGIN
  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return await this.userservices.login(authLoginDto);
  }

  @Post('Forgetpassword')
  async ForgetPassword(@Body() Email) {
    return await this.userservices.ForgetPassword(Email);
  }

  @Patch('Forgetpasswordaftergetmail')
  async Forgetpasswordaftergetmail(
    @Body() forgetpasswordto: forgetPasswordDto,
  ) {
    return await this.userservices.Forgetpasswordaftergetmail(forgetpasswordto);
  }
  // //LOGOUT
  // @Delete('logout')
  // async Logout(@Body() authLoginDto: AuthLoginDto) {
  //   return await this.userservices.Logout(authLoginDto);
  // }
}
