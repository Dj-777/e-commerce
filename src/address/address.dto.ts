import { IsPostalCode, IsNotEmpty } from '@nestjs/class-validator';
import {  MinLength } from 'class-validator';


export class AddressDto {
  @IsNotEmpty({ message: 'add1 is Not Empty' })
  add1: string;

  @IsNotEmpty({ message: 'add2 is Not Empty' })
  add2: string;

 
  @IsNotEmpty({ message: 'street is Not Empty' })
  street: string;


  @IsPostalCode()
  @IsNotEmpty({ message: 'pin code is Not Empty' })
  @MinLength(6)
  pincode: string;

  @IsNotEmpty({ message: ' state is Not Empty' })
  state: string;

 

  @IsNotEmpty({ message: 'City is Not Empty' })
  City: string;

  
}
