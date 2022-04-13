import { IsNotEmpty } from '@nestjs/class-validator';
import { Matches, MinLength } from 'class-validator';

export class forgetPasswordDto {
  access_token: string;

  //   @IsNotEmpty()
  //   @MinLength(8)
  //   @Matches(/( (?=.*\d) |(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //     message: 'Password Is To Weak',
  //   })
  Password: string;

  //   @IsNotEmpty()
  //   @MinLength(8)
  //   @Matches(/( (?=.*\d) |(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //     message: 'Password Is To Weak',
  //   })
  conformPassword: string;
}
