/* eslint-disable prettier/prettier */
import { CartEntity } from './cart.entity';
import { ProductEntity } from 'src/product/product.entity';
import { UserEntity } from 'src/user/model/user.entity';
import { ProductService } from 'src/product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, ProductEntity, UserEntity])],
  providers: [CartService, ProductService],
})
export class CartModule {}
