/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';



@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async getOne(id: number): Promise<ProductEntity> {
    return this.productRepository.findOne({where: {id: id}});
}

  async queryBuilder(alias: string): Promise<SelectQueryBuilder<ProductEntity>> {
    return this.productRepository.createQueryBuilder(alias);
}

async getAll(): Promise<ProductEntity[]> {
  return await this.productRepository.find()
}

async create(product: ProductEntity): Promise<ProductEntity> {
 
      return await this.productRepository.save(product);

  }
  
  async getproductbyId(id: string) {
    return this.productRepository.createQueryBuilder(id);
  }
}
