/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Entity,
  OneToMany,
  JoinColumn,
  OneToOne,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { User } from 'src/user/entity/user.entity';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToMany((type) => ProductEntity, (cart) => cart.id)
  @JoinColumn()
  items: ProductEntity[];

  @OneToOne((type) => User, (user) => user.Email)
  @JoinColumn()
  user: User;

  @Column()
  subTotal: number;

  // @Column({ default: false })
  // pending: boolean;
}
