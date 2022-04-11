/* eslint-disable prettier/prettier */
import { Injectable,  } from '@nestjs/common';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { FilterOperator, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  // async getAll(): Promise<ProductEntity[]> {
  //   return await this.productRepository.find();
  // }

  async queryBuilder(alias: string) {
    return this.productRepository.createQueryBuilder(alias);
}

public findAll(query: PaginateQuery): Promise<Paginated<ProductEntity>> {
  return paginate(query, this.productRepository, {
    sortableColumns: ['id', 'Product_name', 'Desctiption', 'Price', 'Category', 'image',],
    searchableColumns: ['Product_name'],
    defaultSortBy: [['Price', 'DESC']],
    filterableColumns: {
      Category: [FilterOperator.GTE, FilterOperator.LTE],
    },
  })
}
}
