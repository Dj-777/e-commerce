import { Injectable } from '@nestjs/common';
import { Product } from 'src/entity/product.entity';
import { getConnection } from 'typeorm';
import { Sort } from './components/filterenums.enums';
import { FilterProdcutsDto } from './filterprodcuts.dto';

@Injectable()
export class UserService {
  async ShowProdcuts() {
    const Prodcuts = await getConnection()
      .createQueryBuilder()
      .select('Product.Product_name')
      .addSelect('Product.Desctiption')
      .addSelect('Product.Price')
      .addSelect('Product.Category')
      .addSelect('Product.image')
      .from(Product, 'Product')
      .getMany();
    return { Prodcuts };
  }

  async GetProdcutswithFilter(filterprodcutsdto: FilterProdcutsDto) {
    console.log(filterprodcutsdto.)
    if (filterprodcutsdto.sort === Sort.HighToLow) {
      const Prodcuts = await getConnection()
        .createQueryBuilder()
        .select('Product.Product_name')
        .addSelect('Product.Desctiption')
        .addSelect('Product.Price')
        .addSelect('Product.Category')
        .addSelect('Product.image')
        .from(Product, 'Product')
        .orderBy('Product.Price', 'DESC')
        .getMany();
      return { Prodcuts };
    } else if (filterprodcutsdto.sort === Sort.LowToHigh) {
      const Prodcuts = await getConnection()
        .createQueryBuilder()
        .select('Product.Product_name')
        .addSelect('Product.Desctiption')
        .addSelect('Product.Price')
        .addSelect('Product.Category')
        .addSelect('Product.image')
        .from(Product, 'Product')
        .orderBy('Product.Price', 'ASC')
        .getMany();
      return { Prodcuts };
    } else if (filterprodcutsdto.sort === Sort.NewestFirst) {
      const Prodcuts = await getConnection()
        .createQueryBuilder()
        .select('Product.Product_name')
        .addSelect('Product.Desctiption')
        .addSelect('Product.Price')
        .addSelect('Product.Category')
        .addSelect('Product.image')
        .from(Product, 'Product')
        .orderBy('Product.id', 'DESC')
        .getMany();
      return Prodcuts;
    }
  }
}
