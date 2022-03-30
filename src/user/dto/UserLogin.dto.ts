import { IsEmail, IsNotEmpty } from '@nestjs/class-validator';

export class UserLoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
