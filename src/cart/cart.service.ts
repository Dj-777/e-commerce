/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './cart.entity';
import { ProductService } from 'src/product/product.service';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private productsService: ProductService,
  ) {}

  async addToCart(productId: number, quantity: number, user: string): Promise<any> {
        const cartItems = await this.cartRepository.find({ relations: ["item",'user'] });
        const product = await this.productsService.getOne(productId);
        const authUser = await this.userRepository.findOneBy({Email : user})
       
        //Confirm the product exists.
        if (product) {
            //confirm if user has item in cart
            const cart = cartItems.filter(
                (item) => item.item.id === productId && item.user?.Email === user,
            );
            if (cart.length < 1) {
 
                const newItem = this.cartRepository.create({ total: product.Price * quantity, quantity });
                newItem.user = authUser;
                newItem.item = product;
                //this.cartRepository.save(newItem)
 
              await this.cartRepository.save(newItem)
                return this.cartRepository.findOneBy({quantity});
            } else {
                //Update the item quantity
               
                const quantity1 = (cart[0].quantity = quantity);
                const total = product.Price  * quantity1;
              
                await this.cartRepository.update(cart[0].id, { quantity, total });
                
                return this.cartRepository.findOneBy({ quantity});
            }
        }
       
    }

    async getItemsInCart(user: string): Promise<CartEntity[]> {
        const authUser = await this.userRepository.findOneBy({Email : user})
        console.log(authUser);
        if(authUser){
            const userCart = await this.cartRepository.find({ relations: ["item",'user'] });
            //console.log(userCart)
       
           const cart = await userCart.filter((item) =>  item.user?.Email === user)
            return cart;
            
        }
       
    } 
}

