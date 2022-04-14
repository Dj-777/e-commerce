import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
//import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entity/user.entity';
import { ProductEntity } from './product/product.entity';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { CartEntity } from './cart/cart.entity';
import { OrderEntity } from './order/order.entity';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
const entities = [ProductEntity, User, CartEntity, OrderEntity];
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: entities,
      synchronize: true,
      // logging: true,
    }),
    UserModule,
    ProductModule,
    MailModule,
    CartModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
//|i#V>7}aS*==&OO[
// host: 'localhost',
// username: 'id16128292_sql6483987',
// password: '8YOr>/FX=6U-E]3Y',
// database: 'id16128292_ecommercetest',
// entities: [Product],
// synchronize: true,
// logging: true,
