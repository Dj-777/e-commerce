/* eslint-disable prettier/prettier */
import { CartEntity } from './cart.entity';
import { ProductEntity } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, ProductEntity,User])],
  controllers: [CartController],
  providers: [CartService, ProductService, UserService],
})
export class CartModule {}
