/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  
  Get,
  Post,
  Req,
  
  
  
} from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import {Request} from "express";
import { PaginateQuery,Paginated, Paginate} from 'nestjs-paginate'


@Controller('products')
export class ProductController {
  constructor(private productsService: ProductService) {}

  
  @Post('getProductById')
  async Getone(@Req() req: Request) {
    const builder = await this.productsService.getproductbyId('ProductEntity');

    if (req.body.id) {
      return await this.productsService.getOne(req.body.id);
    }
    

  }

  // @Get(':id')
  // async GetOne(@Body() id: number): Promise<ProductEntity> {
  //   return await this.productsService.getOne(id);
 
  // }
  
  @Get('backend')
    async backend(@Req() req: Request) {
        const builder = await this.productsService.queryBuilder('products');

        if (req.body.SearchByName) {
            builder.where("products.Product_name LIKE :SearchByName OR products.Category LIKE :SearchByName", {SearchByName: `%${req.body.SearchByName}%`})
        }

      //   if (req.body.Category) {
      //     builder.andWhere("products.Category LIKE :Category", {Category: `%${req.body.Category}%`})
      // }

        const sort: any = req.body.sort;

        if (sort) {
            builder.orderBy('products.price', sort.toUpperCase());
        }

        const page: number = parseInt(req.body.page as any) || 1;
        const perpage: number = parseInt(req.body.perpage as any) || 1;
        const perPage = perpage;
        const total = await builder.getCount();

        builder.offset((page - 1) * perPage).limit(perPage);

        return {
            data: await builder.getMany(),
        
            total,
            page,
            //last_page: Math.ceil(total / perPage)
        };
    }

    @Get()
    async GetAll(): Promise<ProductEntity[]> {
      return await this.productsService.getAll();
   
    }
}
