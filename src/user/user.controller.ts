import { Body, Controller, Delete, Post } from '@nestjs/common';
import { AuthLoginDto } from 'src/components/authlogin.dto';
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

  // //LOGOUT
  // @Delete('logout')
  // async Logout(@Body() authLoginDto: AuthLoginDto) {
  //   return await this.userservices.Logout(authLoginDto);
  // }
}
