/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Any, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './address.entity';

import { AddressDto } from './address.dto';
import { create } from 'domain';
import { type } from 'os';
import { User } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private AddressRepository: Repository<AddressEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtservice: JwtService,
    private readonly addressdto: AddressDto,
  ) {}
  storestring: {} = {};
  async addAddress(addressdto: AddressDto, req): Promise<any> {
    // const authUser = await this.userRepository.findOneBy({Email : user})
    // console.log(authUser);
    // if(authUser){
    let getheader = req.headers.authorization;

    const splitdata = getheader.split(' ');
    console.log('spilted data', splitdata[1]);
    //return { getheader };
    //jwtFromRequest: ExtractJwt.fromHeader(getheader);

    try {
      const check_accesstoken: { payload: number; exp: number } =
        this.jwtservice.verify(splitdata[1]);
      console.log(check_accesstoken.payload);
      if (check_accesstoken) {
        if (
          addressdto.fullname === '' ||
          addressdto.city === '' ||
          addressdto.housenumber === '' ||
          addressdto.phonenumber === '' ||
          addressdto.roadname_area === '' ||
          addressdto.state === '' ||
          addressdto.pincode === null
        ) {
          return this.addressdto.checkdata(addressdto);
          //return { message: 'Field is required' };
        } else {
          const address = await this.AddressRepository.find({
            relations: ['user'],
          });
          // address.filter((id) => id.user.id===);
          const check_accesstoken = await this.userRepository.findOne({
            where: { Access_Token: splitdata[1] },
          });
          console.log('check_accesstoken.id', check_accesstoken.id);
          if (check_accesstoken) {
            //console.log('This consolr print');
            const finduser = await this.userRepository.findOne({
              where: { id: check_accesstoken.id },
            });
            console.log('UserId:-', finduser.id);
            if (finduser) {
              const fetchIdforFirstinsert =
                await this.AddressRepository.findOne({
                  where: { user: finduser.id },
                });
              console.log(fetchIdforFirstinsert);
              if (fetchIdforFirstinsert === undefined) {
                console.log('hello');
                //console.log(fetchIdforFirstinsert.id);
                //addressdto = fetchIdforFirstinsert.user;
                const addAddress = this.AddressRepository.create(addressdto);
                console.log('After save', addAddress);
                addAddress.user = finduser;
                //fetchIdforFirstinsert.user = finduser;
                const create = await this.AddressRepository.save(addAddress);
                //return create;
                return { Message: 'Your address has been successfully stored' };
              }
              const getCountuserId =
                await this.AddressRepository.createQueryBuilder()
                  .select('user')
                  .where({ user: finduser.id })
                  .getCount();

              if (getCountuserId > 2) {
                return { Message: 'You Cant add more than 3 addres' };
              } else {
                //return { msg: 'You are here' };
                const addAddress = await this.AddressRepository.create(
                  addressdto,
                );
                addAddress.user = finduser;
                const create = await this.AddressRepository.save(addAddress);
                //return create;
                return {
                  Message: 'Your address has been successfully stored ',
                };
              }
            } else {
              return { Message: 'User not found' };
            }
          }

          //     if (finduser) {
          //       // const FindUserByEmail: any = await this.userRepository.findOne({
          //       //   where: { Email: addressdto.Email },
          //       // });
          //       console.log('You are into finduser');
          //       const fetchIdforFirstinsert = await this.AddressRepository.findOne({
          //         where: { user: finduser.id },
          //       });
          //       console.log(fetchIdforFirstinsert.id);
          //       // if (!fetchIdforFirstinsert) {
          //       //   // const addAddress = await this.AddressRepository.create(
          //       //   //   addressdto,
          //       //   // );
          //       //   //addAddress.user = FindUserByEmail;
          //       //   //const create = await this.AddressRepository.save(addAddress);
          //       //   //return create;
          //       //   return { Message: 'Your address has been successfully stored' };
          //       // }
          //       // const getCountuserId =
          //       //   await this.AddressRepository.createQueryBuilder()
          //       //     .select('user')
          //       //     .where({ user: FindUserByEmail.id })
          //       //     .getCount();

          // if (getCountuserId > 2) {
          //   return { Message: 'You Cant add more than 3 addres' };
          // } else {
          //   //return { msg: 'You are here' };
          //   const addAddress = await this.AddressRepository.create(
          //     addressdto,
          //   );
          //   //addAddress.user = FindUserByEmail;
          //   const create = await this.AddressRepository.save(addAddress);
          //   //return create;
          //   return { Message: 'Your address has been successfully stored ' };
        }
      } else {
        return { Message: 'You have register first' };
      }
      // } else {
      //     // }

      //     //  else {
      //     // }
      //     // const count = await this.AddressRepository.count({where:{user:FindUserByEmail.id}});
      //   }
      //   //return check_accesstoken.payload;
      // } else {
      //   return { Message: 'somthing want worng' };
      // }
    } catch (er) {
      throw new UnauthorizedException('You have to login again');
    }
  }
}
/*   */
