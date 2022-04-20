/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Request, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';


@Controller('order')
export class OrderController {
   constructor(private orderService: OrderService) { }

   //@UseGuards(JwtAuthGuard)
   @Get()
   async order(@Request() req): Promise<any> {
   
       return this.orderService.order(req)
   }

   //@UseGuards(JwtAuthGuard)
   // @Post('getorder')
   // async getOrders(@Body() body,@Request() req): Promise<OrderEntity[]> {
   //  const { Email } = body;
   //     return await this.orderService.getOrders(Email)
   // }
}