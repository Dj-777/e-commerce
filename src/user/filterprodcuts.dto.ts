import { IsEnum, IsIn, IsOptional } from '@nestjs/class-validator';

import { Category, Sort } from './components/filterenums.enums';

export class FilterProdcutsDto {
  @IsIn(Object.values(Sort))
  @IsOptional()
  @IsEnum(Sort)
  public sort: Sort;

  @IsIn(Object.values(Category))
  @IsOptional()
  @IsEnum(Category)
  public Category: Category;
}
