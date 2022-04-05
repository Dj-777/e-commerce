import { Body, Controller, Get, Post } from '@nestjs/common';
import { FilterProdcutsDto } from './filterprodcuts.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userservices: UserService) {}

  @Get('showprodcuts')
  async ShowProdcuts() {
    return await this.userservices.ShowProdcuts();
  }

  @Post('GetProdcutswithfilter')
  // async GetProdcutswithfilter(@Body() filterprodcutsdto: FilterProdcutsDto) {
  //   return await this.userservices.GetProdcutswithFilter(filterprodcutsdto);
  // }
  async GetProdcutswithfilter(@Body() data: FilterProdcutsDto) {
    return await this.userservices.GetProdcutswithFilter(data);
  }
}
