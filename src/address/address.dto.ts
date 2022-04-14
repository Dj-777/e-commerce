import { MinLength, IsPostalCode, IsNotEmpty } from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  Email: string;
  @IsNotEmpty()
  fullname: string;
  @IsNotEmpty()
  phonenumber: string;
  @IsNotEmpty()
  @IsPostalCode()
  @MinLength(6)
  pincode: number;
  @IsNotEmpty()
  state: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  housenumber: string;
  @IsNotEmpty()
  roadname_area: string;
}
