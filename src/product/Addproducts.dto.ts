import { IsNotEmpty } from '@nestjs/class-validator';

export class AddProdcutsDto {
  @IsNotEmpty()
  Product_name: string;

  @IsNotEmpty()
  Desctiption: string;

  @IsNotEmpty()
  Price: string;

  @IsNotEmpty()
  Category: string;

  @IsNotEmpty()
  image: string;
}
