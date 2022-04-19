/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AddressEntity } from './address.entity';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AddressDto } from './address.dto';

@Module({
  imports: [
    JwtModule.register({
      secret: 'Secret',
    }),
    TypeOrmModule.forFeature([AddressEntity, User]),
  ],
  controllers: [AddressController],
  providers: [AddressService, AddressDto],
})
export class AddressModule {}
