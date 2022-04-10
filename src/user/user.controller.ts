import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthLoginDto } from 'src/components/authlogin.dto';
import { RegisterUserDto } from 'src/components/userregister.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userservices: UserService) {}

  //Register
  @Post('register')
  async RegisterUser(@Body() registeruserdto: RegisterUserDto) {
    return await this.userservices.RegisterUser(registeruserdto);
  }
  //Register

  //Login
  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return await this.userservices.login(authLoginDto);
  }
  //Login


  //Forget-Password
  @Post('Forgetpassword')
  async ForgetPassword(@Body() Email){
    return await this.userservices.ForgetPassword(Email);
  }
  //Forget-Password

  //Profile
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async GetPRofile(@Request() req){
    return await req.user;
  }
}
