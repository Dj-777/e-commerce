/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Request,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CartEntity } from './cart.entity';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  async AddToCart(@Body() body, @Request() req): Promise<void> {
    const { productId, quantity } = body;
    return await this.cartService.addToCart(
      parseInt(productId),
      parseInt(quantity),
     req,
    );
  }

  //@UseGuards(JwtAuthGuard)
  @Get('getcart')
  async getItemsInCart(@Request() req): Promise<CartEntity[]> {
    
    return await this.cartService.getItemsInCart(req);
  }
}

