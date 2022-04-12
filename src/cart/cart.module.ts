/* eslint-disable prettier/prettier */
import { CartEntity } from './cart.entity';
import { ProductEntity } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { Module } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, ProductEntity, User])],
  providers: [CartService, ProductService],
})
export class CartModule {}
