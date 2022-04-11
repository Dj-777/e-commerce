/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './cart.entity';
import { UserEntity } from 'src/user/model/user.entity';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private productsService: ProductService,
  ) {}

  async addToCart(productId: number, quantity: number, user: string): Promise<any> {
        const cartItems = await this.cartRepository.find({ relations: ["item",'user'] });
        const product = await this.productsService.getOne(productId);
        const authUser = await this.userRepository.findOne({ username: user })
       
        //Confirm the product exists.
        if (product) {
            //confirm if user has item in cart
            const cart = cartItems.filter(
                (item) => item.item.id === productId && item.user.username === user,
            );
            if (cart.length < 1) {
 
                const newItem = this.cartRepository.create({ total: product.Price * quantity, quantity });
                newItem.user = authUser;
                newItem.item = product;
                this.cartRepository.save(newItem)
 
                return await this.cartRepository.save(newItem)
            } else {
                //Update the item quantity
                const quantity = (cart[0].quantity += 1);
                const total = cart[0].total * quantity;
 
                return await this.cartRepository.update(cart[0].id, { quantity, total });
            }
        }
        return null;
    }

    async getItemsInCard(user: string): Promise<CartEntity[]> {
        const userCart = await this.cartRepository.find({ relations: ["item",'user'] });
        return (await userCart).filter(item => item.user.username === user)
    }
}

