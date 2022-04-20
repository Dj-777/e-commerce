/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { CartService } from 'src/cart/cart.service';
import { User } from 'src/entity/user.entity';
import { CartEntity } from 'src/cart/cart.entity';
import { JwtService } from '@nestjs/jwt';

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
    private readonly jwtservice: JwtService,
  ) { }

  async order(req): Promise<any> {
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
            const cartItem = await this.cartRepository.find({ relations: ["item", 'user'] });

            //find user existing orders
            const usersOrder = await this.orderRepository.find({ relations: ['user'] });
            const userOrder = usersOrder.filter(order => order.user?.id === check_accesstoken.id);
            //find user's cart items
            const cartItems = await this.cartService.getItemsInCart(req)
            const subTotal = cartItems.map(item => item.total).reduce((acc, next) => acc + next);
            //get the authenticated user
           
            //if users has an pending order - add item to the list of order
            const cart = await cartItems.map(item => item.item);

            if (userOrder.length === 0) {
              const newOrder = await this.orderRepository.create({ subTotal });
              newOrder.items = cart
              newOrder.user = finduser;
              await this.orderRepository.save(newOrder);

              const cart1 = cartItem.filter(
                (item) => item.quantity && item.user?.id === check_accesstoken.id,
              );
              if (cart1) {
                cart1.map(el => delete el.user)
              }
              return { cart1, subTotal };


            } else {
              const existingOrder = userOrder.map(item => item)
              await this.orderRepository.update(existingOrder[0].id, { subTotal: subTotal });
              const cart1 = cartItem.filter(
                (item) => item.user?.id === check_accesstoken.id,
              );
              if (cart1) {
                cart1.map(el => delete el.user)
              }
              return { cart1, subTotal };

              
            }
          }
        };
      }
    }
      
      catch (er) {
          throw new UnauthorizedException('You have to login again');
        }
      }

      // async getOrders(user: string): Promise<OrderEntity[]> {
      //   const authUser = await this.userRepository.findOne({Email : user})
      //   console.log(authUser);
      //   if(authUser){
      //         const orders = await this.orderRepository.find({ relations: ['user'] });
      //        const order = orders.filter(order => order.user?.Email === user);
      //        return order;
      //     }
      //  }
    }

