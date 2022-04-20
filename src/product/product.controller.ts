/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  
  Get,
  Post,
  Req,
  UnauthorizedException,
  
  
  
} from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import {Request} from "express";
import { AddProdcutsDto } from './Addproducts.dto';
import { JwtService } from '@nestjs/jwt';



@Controller('products')
export class ProductController {
  constructor(private productsService: ProductService,private readonly jwtservice: JwtService,) {}

  
  // @Get()
  // async GetAll(): Promise<ProductEntity[]> {
  //   return await this.productsService.getAll();
  // }

  @Post('getProductById')
  async Getone(@Req() req) {
    await this.productsService.getproductbyId('ProductEntity');

    if (req.body.id) {
      return await this.productsService.getOne(req.body.id);
    }
    

  }

  
  @Post('filterproduct')
    async backend(@Req() req) {
      let getheader = req.headers.authorization;

      const splitdata = getheader.split(' ');
      console.log('spilted data', splitdata[1]);
        
      try {
      const check_accesstoken: { payload: number; exp: number } =
        this.jwtservice.verify(splitdata[1]);
      console.log(check_accesstoken.payload);
      if (check_accesstoken) {

        const builder = await this.productsService.queryBuilder('ProductEntity');

        if (req.body.SearchByName) {
            builder.where("ProductEntity.Product_name ILIKE :SearchByName OR ProductEntity.Category ILIKE :SearchByName", {SearchByName: `%${req.body.SearchByName}%`})
        }

        const sort: any = req.body.sort;

        if (sort) {
            builder.orderBy('ProductEntity.Price', sort.toUpperCase());
        }

        const page: number = parseInt(req.body.page as any) || 1;
        const perpage: number = parseInt(req.body.perpage as any) || 8;
        const perPage = perpage;
        const total = await builder.getCount();

        builder.offset((page - 1) * perPage).limit(perPage);

        return {
            data: await builder.getMany(),
        
            total,
            page,
            //last_page: Math.ceil(total / perPage)
        };
      };
      }
      catch (er) {
        throw new UnauthorizedException('You have to login again');
      }
    }

    @Post('getOneWithquantity')
    async getOneWithquantity(@Body() body,@Req() req) {
      const {productId} = body;
      const builder = await this.productsService.getproductbyId('ProductEntity');
  
     
        return await this.productsService.getOneWithquantity(parseInt(productId), req);
      
      
  
    }

    @Post('createproducts')
    async Create( @Body() product: ProductEntity): Promise<ProductEntity> {
      return await this.productsService.create(product);
    }

    // @Get()
    // async GetAll(): Promise<ProductEntity[]> {
    //   return await this.productsService.getAll();
   
    // }
}
