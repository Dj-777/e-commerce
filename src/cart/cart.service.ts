/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './cart.entity';
import { ProductService } from 'src/product/product.service';
import { User } from 'src/user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
   
    private productsService: ProductService,
    private readonly jwtservice: JwtService,
  ) {}

  async addToCart(productId: number, quantity: number, req): Promise<any> {

    let getheader = req.headers.authorization;

    const splitdata = getheader.split(' ');
    console.log('spilted data', splitdata[1]);

    try {
        const check_accesstoken: { payload: number; exp: number } =
          this.jwtservice.verify(splitdata[1]);
        console.log(check_accesstoken.payload);
        if (check_accesstoken) {
    const cartItems = await this.cartRepository.find({ relations: ["item",'user'] });
    const product = await this.productsService.getOne(productId);

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
    //const authUser = await this.userRepository.findOne({Email : Email})
   
    //Confirm the product exists.
    if (product) {
        //confirm if user has item in cart
        const cart = cartItems.filter(
            (item) => item.item.id === productId && item.user?.id === check_accesstoken.id,
        );
        if (cart.length < 1) {

            const newItem = this.cartRepository.create({ total: product.Price * quantity, quantity });
            newItem.user = finduser;
            newItem.item = product;
            //this.cartRepository.save(newItem)
            
             await this.cartRepository.save(newItem)
             
            

             return this.cartRepository.findOneBy({total: product.Price * quantity});
            
        } else {
            //Update the item quantity
           
            

            if( quantity === 0 ){
                this.cartRepository.delete(cart[0].id);
            }else{

            const quantity1 = (cart[0].quantity = quantity);
            const total = product.Price  * quantity1;
          
            await this.cartRepository.update(cart[0].id, { quantity, total });

            
            
            return this.cartRepository.findOneBy({ total});
        }
    }
}
        }
    }};
}
catch (er) {
  throw new UnauthorizedException('You have to login again');
}
   
}

    async getItemsInCart(user: string): Promise<CartEntity[]> {
        const authUser = await this.userRepository.findOneBy({Email : user})
        console.log(authUser);
        if(authUser){
            const userCart = await this.cartRepository.find({ relations: ["item",'user'] });
            //console.log(userCart)

            
       
           const cart = await userCart.filter((item) =>  item.user?.Email === user)
          
            //this.cartRepository.findOneBy({item})
            if(cart){
                cart.map(el => delete el.user)
              }
           return cart;
            
        }
       
    } 
}

