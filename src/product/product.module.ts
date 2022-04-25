/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { CartEntity } from 'src/cart/cart.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: 'Secret',
  }),TypeOrmModule.forFeature([ProductEntity, CartEntity])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}