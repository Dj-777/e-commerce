/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { User } from 'src/user/entity/user.entity';
import { CartService } from 'src/cart/cart.service';
import { CartEntity } from 'src/cart/cart.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private cartService: CartService,
  ) {}

  async order(user: string): Promise<any> {
    const cartItem = await this.cartRepository.find({ relations: ["item",'user'] });
    
        //find user existing orders
        const usersOrder = await this.orderRepository.find({ relations: ['user'] });
        const userOrder = usersOrder.filter(order => order.user?.Email === user);
        //find user's cart items
        const cartItems = await this.cartService.getItemsInCart(user)
        const subTotal = cartItems.map(item => item.total).reduce((acc, next) => acc + next);
        //get the authenticated user
        const authUser = await this.userRepository.findOneBy({ Email: user })
        //if users has an pending order - add item to the list of order
        const cart = await cartItems.map(item => item.item);
 
        if (userOrder.length === 0) {
            const newOrder = await this.orderRepository.create({ subTotal });
            newOrder.items = cart
            newOrder.user = authUser;
          await this.orderRepository.save(newOrder);
 
          const cart1 = cartItem.filter(
            (item) => item.quantity && item.user?.Email === user
        );
         return {cart1 ,subTotal};
          
 
        } else {
            const existingOrder = userOrder.map(item => item)
            await this.orderRepository.update(existingOrder[0].id, { subTotal: subTotal });
            const cart1 = cartItem.filter(
              (item) => item.user?.Email === user
          );
          if(cart1){
            
          }
           return {cart1 ,subTotal};
            //  const orders = await this.orderRepository.find({ relations: ['user'] });
            //  const find1 = await orders.find((subtotal) => subtotal.subTotal);
            //  const find2 = find1.subTotal;
            //  const userCart = await this.cartRepository.find({ relations: ["item",'user'] });
       //console.log(userCart)
  
    //  const cart = await userCart.filter((item) =>  item.user?.Email === user)
      // const find = await userCart.find((item) =>  item.item)
     
      // return {find2};
        }
     
}

async getOrders(user: string): Promise<any> {
 

  const authUser = await this.userRepository.findOneBy({Email : user})
 
  console.log(authUser);
  if(authUser){
        const orders = await this.orderRepository.find({ relations: ['user'] });
        const find1 = await orders.find((subtotal) => subtotal.subTotal);
        const find2 = find1.subTotal;
      // const order = orders.filter(order => order.user?.Email === user);
       const userCart = await this.cartRepository.find({ relations: ["item",'user'] });
       //console.log(userCart)
  
    //  const cart = await userCart.filter((item) =>  item.user?.Email === user)
      const find = await userCart.find((item) =>  item.item)
     
     return {find , find2};
       //return {cart , order};
     
    }
    
 }

}

