import { IsEmail, IsNotEmpty } from '@nestjs/class-validator';
import { IsEnum, IsIn, Matches, MinLength } from 'class-validator';
import { Gender } from './userRegister.enum';

export class RegisterUserDto {
  @IsNotEmpty()
  First_name: string;

  @IsNotEmpty()
  Last_name: string;

  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/( (?=.*\d) |(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password Is To Weak',
  })
  Password: string;

  @IsNotEmpty()
  Country: string;

  @IsNotEmpty()
  State: string;

  @IsNotEmpty()
  City: string;

  @IsIn(Object.values(Gender))
  @IsEnum(Gender)
  public Gender: Gender;
}
