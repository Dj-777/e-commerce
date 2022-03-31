import { Injectable } from '@nestjs/common';
import { Product } from 'src/entity/product.entity';

@Injectable()
export class ProductService {
  async AddProdcuts(data) {
    Product.create(data);
    await Product.save(data);
    return data;
  }
}
