/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddressDto } from './address.dto';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  //@UseGuards(JwtAuthGuard)
  @Post('add-address')
  async addAddress(@Body() addressdto: AddressDto): Promise<any> {
    return this.addressService.addAddress(addressdto);
  }

  //    //@UseGuards(JwtAuthGuard)
  //    @Get()
  //    async getOrders(@Body() body,@Request() req): Promise<OrderEntity[]> {
  //     const { Email } = body;
  //        return await this.orderService.getOrders(Email)
  //    }
}
