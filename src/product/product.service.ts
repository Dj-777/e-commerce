/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { CartEntity } from 'src/cart/cart.entity';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/entity/user.entity';



@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(ProductEntity)

    private productRepository: Repository<ProductEntity>,
    private readonly jwtservice: JwtService,
  ) { }

  async getOne(id: number): Promise<ProductEntity> {
    return this.productRepository.findOne({ where: { id: id } });
  }

  async queryBuilder(alias: string): Promise<SelectQueryBuilder<ProductEntity>> {
    return this.productRepository.createQueryBuilder(alias);
  }

  async getOneWithquantity(productId: number, req) {

    let getheader = req.headers.authorization;

    const splitdata = getheader.split(' ');
    console.log('spilted data', splitdata[1]);

    try {
      const check_accesstoken: { payload: number; exp: number } =
        this.jwtservice.verify(splitdata[1]);
      console.log(check_accesstoken.payload);
      if (check_accesstoken) {
        const check_accesstoken = await this.userRepository.findOne({
          where: { Access_Token: splitdata[1] },
        });

        if (check_accesstoken) {
          //console.log('This consolr print');
          const finduser = await this.userRepository.findOne({
            where: { id: check_accesstoken.id },
          });

          if (check_accesstoken) {
            //console.log('This consolr print');
            const finduser = await this.userRepository.findOne({
              where: { id: check_accesstoken.id },
            });

            const cartItems = await this.cartRepository.find({ relations: ["item", 'user'] });

            const cart = cartItems.filter(
              (item) => item.item.id === productId && item.user?.id === check_accesstoken.id
            );

            console.warn(cart)

            if (cart.length <= 0) {
              return { qauntity: 0 }


            } else {

              if (cart) {
                cart.map(el => delete el.user)
              }
              return cart;


            }
          }}
        }
    }
    catch (er) {
      throw new UnauthorizedException('You have to login again');
}

}


  async create(product: ProductEntity): Promise < ProductEntity > {

            return await this.productRepository.save(product);

          }

  async getproductbyId(id: string) {
            return this.productRepository.createQueryBuilder(id);
          }
        }


// async getAll(): Promise<ProductEntity[]> {
//   return await this.productRepository.find()
// }
