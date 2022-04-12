/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException,  } from '@nestjs/common';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { AddProdcutsDto } from './Addproducts.dto';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async getOne(id: number): Promise<ProductEntity> {
    return this.productRepository.findOne({where: {id: id}});
}

  async queryBuilder(alias: string) {
    return this.productRepository.createQueryBuilder(alias);
}

async getAll(): Promise<ProductEntity[]> {
  return await this.productRepository.find()
}

async create(product: ProductEntity): Promise<ProductEntity> {
  
      return await this.productRepository.save(product);

  
}
}
