/* eslint-disable prettier/prettier */
import { Injectable,  } from '@nestjs/common';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './address.entity';
import { User } from 'src/user/entity/user.entity';
import { AddressDto } from './address.dto';
import { create } from 'domain';


@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private AddressRepository: Repository<AddressEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

async addAddress( add: AddressEntity): Promise<AddressEntity> {
    // const authUser = await this.userRepository.findOneBy({Email : user})
    // console.log(authUser);
    // if(authUser){
    //       const address = await this.AddressRepository.find({ relations: ['user'] });
    //       if(address){
              await this.AddressRepository.create(add);
               const create = await this.AddressRepository.save(add);
              return create;
          }
     
      }
 //  }
//   async queryBuilder(alias: string) {
//     return this.productRepository.createQueryBuilder(alias);
// }

// async getAll(): Promise<ProductEntity[]> {
//   return await this.productRepository.find()
// }


