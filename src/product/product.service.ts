/* eslint-disable prettier/prettier */
import { Injectable,  } from '@nestjs/common';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { FilterOperator, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
import { CartEntity } from 'src/cart/cart.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    
  ) {}

  async getOneWithquantity(id: number, Email: string) {
    
  

   const cartItems = await this.cartRepository.find({ relations: ["item",'user'] });
   
     const cart = cartItems.filter(
      (item) => item.item.id === id && item.user?.Email === Email 
  );

  console.warn(cart)
   
  if(cart.length <= 0){
    return {qauntity: 0}
    
    
  }else {
    
    return cart
  
  }
}

  async queryBuilder(alias: string) {
    return this.productRepository.createQueryBuilder(alias);
}

async getOne(id: number): Promise<ProductEntity> {
  return this.productRepository.findOne({where: {id: id}});
}

// async getAll(): Promise<ProductEntity[]> {
//   return await this.productRepository.find()
// }

async getproductbyId(id: string) {
  return this.productRepository.createQueryBuilder(id);
}


}
