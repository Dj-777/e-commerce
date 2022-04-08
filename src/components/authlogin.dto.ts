import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  Email: string;

  @IsNotEmpty()
  Password: string;
}
