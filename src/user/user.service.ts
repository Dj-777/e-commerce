import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/user.dto';
import { UserLoginDto } from './dto/UserLogin.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}
  //USER REGISTRACTION
  async create(createUserDto: CreateUserDto) {
    const checkkemail = await User.findOne({
      where: { email: createUserDto.email },
    });
    if (checkkemail) {
      return 'you are already registred with this email';
    } else {
      const user = User.create(createUserDto);
      await user.save();
      delete user.password;
      return user;
    }
  }
  //USER REGISTRACTION

  //LOGIN
  async login(authLoginDto: UserLoginDto) {
    const user = await this.validateUser(authLoginDto);
    const payload = `${user.email},${user.id}`;
    const access_Token = this.jwtService.sign(payload);
    if (await User.findOne({ where: { email: authLoginDto.email } })) {
      return 'You Are Already Loged Into System Please Make Sure You Logout First Before Login Again';
    }
    return {
      Yourdata: `${authLoginDto.email} and ${authLoginDto.password} and Access Token Is Needed For Reseting Password`,
      access_token: access_Token,
    };
  }
  async validateUser(authLoginDto: UserLoginDto): Promise<User> {
    const { email, password } = authLoginDto;
    const user = await User.findOne({ where: { email: email } });
    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException();
    }
    return user;
  }
  //LOGIN
}
