import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
//import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogInUsers } from './entity/LoginUser.entity';
import { Product } from './entity/testdb.entity';
import { User } from './entity/user.entity';
import { ProductEntity } from './product/product.entity';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
const entities = [ProductEntity, User, LogInUsers];
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: entities,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    ProductModule
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
