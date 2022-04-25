/* eslint-disable prettier/prettier */
import { CartEntity } from './cart.entity';
import { ProductEntity } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { Module } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { CartController } from './cart.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: 'Secret',
  }),TypeOrmModule.forFeature([CartEntity, ProductEntity, User])],
  controllers: [CartController],
  providers: [CartService, ProductService],
})
export class CartModule {}
