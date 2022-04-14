import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Gender } from '../components/userRegister.enum';
import { CartEntity } from 'src/cart/cart.entity';
import { OrderEntity } from 'src/order/order.entity';
import { AddressEntity } from 'src/address/address.entity';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  First_name: string;

  @Column()
  Last_name: string;

  @Column()
  Email: string;

  @Column()
  Password: string;

  @Column()
  Country: string;

  @Column()
  State: string;

  @Column()
  City: string;

  @Column({ type: 'enum', enum: Gender })
  Gender: Gender;

  @Column({ default: null })
  Access_Token: string;

  @OneToMany(type => CartEntity, cart => cart.id)
   @JoinColumn()
   cart: CartEntity[]

   @OneToOne(type => OrderEntity, order => order.id)
   @JoinColumn()
   order : OrderEntity;

   @OneToMany(type => AddressEntity,  address =>  address.id)
   @JoinColumn()
   address : AddressEntity;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.Password = await bcrypt.hash(this.Password, 8);
  }
  async ValidatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.Password);
  }
}
