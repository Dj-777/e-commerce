/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';


@Controller('order')
export class OrderController {
   constructor(private orderService: OrderService) { }

   //@UseGuards(JwtAuthGuard)
   @Post()
   async order(@Request() req): Promise<any> {
       return this.orderService.order(req.user.username)
   }

   //@UseGuards(JwtAuthGuard)
   @Get()
   async getOrders(@Request() req): Promise<OrderEntity[]> {
       return await this.orderService.getOrders(req.user.username)
   }
}