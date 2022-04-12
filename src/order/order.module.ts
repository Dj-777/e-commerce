/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from 'src/product/product.entity';
import { CartEntity } from 'src/cart/cart.entity';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { CartService } from 'src/cart/cart.service';
import { ProductService } from 'src/product/product.service';
import { OrderController } from './order.controller';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, ProductEntity, CartEntity, User]),
  ],
  controllers: [OrderController],
  providers: [OrderService, CartService, ProductService],
})
export class OrderModule {}
