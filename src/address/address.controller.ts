/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  UseGuards,
  Body,
  Req,
  Header,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';

import { read } from 'fs';
import { ExtractJwt } from 'passport-jwt';
import { AddressDto } from './address.dto';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  //@UseGuards(JwtAuthGuard)
  @Post('add-address')
  async addAddress(@Body() addressdto: AddressDto, @Req() req): Promise<any> {
    return this.addressService.addAddress(addressdto, req);
  }
}
//    //@UseGuards(JwtAuthGuard)
//    @Get()
//    async getOrders(@Body() body,@Request() req): Promise<OrderEntity[]> {
//     const { Email } = body;
//        return await this.orderService.getOrders(Email)
//    }
