/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Request, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddressService } from './address.service';



@Controller('address')
export class AddressController {
   constructor(private addressService: AddressService) { }

   //@UseGuards(JwtAuthGuard)
   @Post()
   async addAddress(@Body() add,@Request() req): Promise<any> {
   
       return this.addressService.addAddress(add)
   }

//    //@UseGuards(JwtAuthGuard)
//    @Get()
//    async getOrders(@Body() body,@Request() req): Promise<OrderEntity[]> {
//     const { Email } = body;
//        return await this.orderService.getOrders(Email)
//    }
}