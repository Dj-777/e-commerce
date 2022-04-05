import { Injectable } from '@nestjs/common';
import { filter } from 'rxjs';
import { Product } from 'src/entity/product.entity';
import { getConnection } from 'typeorm';
import { Category, Sort } from './components/filterenums.enums';
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
    // console.log(filterprodcutsdto.)
    const HoldCate = { Category };
    console.log(HoldCate);
    console.log(filterprodcutsdto.Category);
    console.log(filterprodcutsdto.sort);
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
    } else if (
      filterprodcutsdto.Category === Category.clothes ||
      Category.Sport ||
      Category.Jwellery ||
      Category.Electronicsgadegets
    ) {
      const Prodcuts = await getConnection()
        .createQueryBuilder()
        .select('Product.Product_name')
        .addSelect('Product.Desctiption')
        .addSelect('Product.Price')
        .addSelect('Product.Category')
        .addSelect('Product.image')
        .from(Product, 'Product')
        .where('Product.Category=:Category', {
          Category: filterprodcutsdto.Category,
        })
        .orderBy('Product.Price', 'DESC')
        .getMany();
      return { Prodcuts };
    } else if (filterprodcutsdto.sort === Sort.HighToLow) {
      const Prodcuts = await getConnection()
        .createQueryBuilder()
        .select('Product.Product_name')
        .addSelect('Product.Desctiption')
        .addSelect('Product.Price')
        .addSelect('Product.Category')
        .addSelect('Product.image')
        .from(Product, 'Product')
        .where('Product.Category=:Category', {
          Category: filterprodcutsdto.Category,
        })
        .orderBy('Product.Price', 'ASC')
        .getMany();
      return { Prodcuts };
    }
    //  else if (filterprodcutsdto.sort === Sort.NewestFirst) {
    //   const Prodcuts = await getConnection()
    //     .createQueryBuilder()
    //     .select('Product.Product_name')
    //     .addSelect('Product.Desctiption')
    //     .addSelect('Product.Price')
    //     .addSelect('Product.Category')
    //     .addSelect('Product.image')
    //     .from(Product, 'Product')
    //     .where('Product.Category=:Category', {
    //       Category: filterprodcutsdto.Category,
    //     })
    //     .orderBy('Product.id', 'DESC')
    //     .getMany();
    //   return Prodcuts;
    // }
  }
}
