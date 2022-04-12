import { IsEmail, IsNotEmpty } from '@nestjs/class-validator';
import { IsEnum, IsIn, Matches, MinLength } from 'class-validator';
import { Gender } from './userRegister.enum';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'First_name is Not Empty' })
  First_name: string;

  @IsNotEmpty({ message: 'Last_name is Not Empty' })
  Last_name: string;

  @IsEmail({ message: 'Email is must Email' })
  @IsNotEmpty({ message: 'Email is Not Empty' })
  Email: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/( (?=.*\d) |(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password Is To Weak',
  })
  Password: string;

  @IsNotEmpty({ message: 'Country is Not Empty' })
  Country: string;

  @IsNotEmpty({ message: 'State is Not Empty' })
  State: string;

  @IsNotEmpty({ message: 'City is Not Empty' })
  City: string;

  @IsIn(Object.values(Gender))
  @IsEnum(Gender)
  public Gender: Gender;

  Access_Token: string;
}
