/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { UserEntity } from 'src/user/model/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async getAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async create(product: ProductEntity, user: UserEntity): Promise<ProductEntity> {
    if (user.role == 'admin') {
      return await this.productRepository.save(product);
    }
    throw new UnauthorizedException();
  }

  async getOne(id: number): Promise<ProductEntity> {
    return this.productRepository.findOne(id);
  }

  async findAllByProductname(Product_name: string): Promise<ProductEntity[]> {
        return this.productRepository.find({
          where: {
                Product_name: Like(`%${Product_name.toLowerCase()}%`),
          },
        });
      }

  async update(
    id: number,
    product: ProductEntity,
    user: UserEntity,
  ): Promise<UpdateResult> {
    if (user.role == 'admin') {
      return await this.productRepository.update(id, product);
    }
    throw new UnauthorizedException();
  }

  async delete(id: number, user: UserEntity): Promise<DeleteResult> {
    if (user.role == 'admin') {
      return await this.productRepository.delete(id);
    }
    throw new UnauthorizedException();
  }
}
