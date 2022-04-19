import { Body } from '@nestjs/common';
import { MinLength, IsPostalCode, IsNotEmpty } from 'class-validator';
import { User } from 'src/entity/user.entity';

export class AddressDto {
  fullname: string;

  phonenumber: string;

  //@IsPostalCode()
  @MinLength(6)
  pincode: string;

  state: string;

  city: string;

  housenumber: string;

  roadname_area: string;
  user: User;
  storestring: {} = {};
  async checkdata(addressdto) {
    let fullname,
      phonenumber,
      pincode,
      pincodelength,
      state,
      city,
      housenumber,
      roadname_area;

    if (addressdto.fullname === '') {
      fullname = 'fullname is required';
    }
    if (addressdto.phonenumber === '') {
      phonenumber = 'phonenumber is required';
    }
    if (addressdto.pincode === '') {
      pincode = 'pincode is required';
    }
    if (addressdto.pincode.length < 6) {
      pincodelength = 'pincode only have 6 digits';
    }
    if (addressdto.pincode.length > 6) {
      pincodelength = 'pincode only have 6 digits';
    }
    if (addressdto.state === '') {
      state = 'state is required';
    }
    if (addressdto.city === '') {
      city = 'city is required';
    }
    if (addressdto.housenumber === '') {
      housenumber = 'housenumber is required';
      //this.storestring = { email, fullname, phonenumber, pincode, state };
    }
    if (addressdto.roadname_area === '') {
      roadname_area = 'roadname_area is required';
    }
    this.storestring = {
      fullname,
      phonenumber,
      pincode,
      pincodelength,
      state,
      city,
      housenumber,
      roadname_area,
    };
    return this.storestring;
  }
}
