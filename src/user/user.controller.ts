import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserLoginDto } from './dto/UserLogin.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersServices: UserService) {}

  @Post('register')
  async create(@Body() createuserdto: CreateUserDto) {
    return await this.usersServices.create(createuserdto);
  }

  //LOGIN
  @Post('login')
  async login(@Body() authLoginDto: UserLoginDto) {
    return this.usersServices.login(authLoginDto);
  }
}
