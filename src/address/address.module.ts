/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { AddressEntity } from './address.entity';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { UserService } from 'src/user/user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([AddressEntity, User]),
    ],
    controllers: [AddressController],
    providers: [AddressService],
})
export class AddressModule {}
