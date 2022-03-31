import { Body, Controller, Post } from '@nestjs/common';
import { AddProdcutsDto } from './Addproducts.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly prodcutservice: ProductService) {}

  @Post('AddProdcuts')
  async AddProdcuts(@Body() addproductdto: AddProdcutsDto) {
    await this.prodcutservice.AddProdcuts(addproductdto);
  }
}
