import { IsEmail, IsNotEmpty } from '@nestjs/class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  First_name: string;

  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @IsNotEmpty()
  Password: string;
}
