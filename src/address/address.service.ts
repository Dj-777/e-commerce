/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Any, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './address.entity';
import { User } from 'src/user/entity/user.entity';
import { AddressDto } from './address.dto';
import { create } from 'domain';
import { type } from 'os';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private AddressRepository: Repository<AddressEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async addAddress(addressdto: AddressDto): Promise<any> {
    // const authUser = await this.userRepository.findOneBy({Email : user})
    // console.log(authUser);
    // if(authUser){
    if (
      addressdto.fullname === '' ||
      addressdto.Email === '' ||
      addressdto.city === '' ||
      addressdto.housenumber === '' ||
      addressdto.phonenumber === '' ||
      addressdto.roadname_area === '' ||
      addressdto.state === '' ||
      addressdto.pincode === null
    ) {
      return { message: 'Field is required' };
    } else {
      const address = await this.AddressRepository.find({
        relations: ['user'],
      });
      if (
        await this.userRepository.findOne({
          where: { Email: addressdto.Email },
        })
      ) {
        const FindUserByEmail: any = await this.userRepository.findOne({
          where: { Email: addressdto.Email },
        });

        const fetchIdforFirstinsert = await this.AddressRepository.findOne({
          where: { user: FindUserByEmail.id },
        });

        if (!fetchIdforFirstinsert) {
          const addAddress = await this.AddressRepository.create(addressdto);
          addAddress.user = FindUserByEmail;
          const create = await this.AddressRepository.save(addAddress);
          return create;
          //return { Message: 'You are here' };
        }
        const getCountuserId = await this.AddressRepository.createQueryBuilder()
          .select('user')
          .where({ user: FindUserByEmail.id })
          .getCount();

        if (getCountuserId > 2) {
          return { Message: 'You Cant add more than 3 addres' };
        } else {
          //return { msg: 'You are here' };
          const addAddress = await this.AddressRepository.create(addressdto);
          addAddress.user = FindUserByEmail;
          const create = await this.AddressRepository.save(addAddress);
          return create;
        }
      } else {
        return { Message: 'you need to register first' };
      }

      //  else {
      // }
      // const count = await this.AddressRepository.count({where:{user:FindUserByEmail.id}});
    }
  }
}
