/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Entity,
  OneToOne,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { User } from 'src/user/entity/user.entity';

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  total: number;

  @Column()
  quantity: number;

  @ManyToOne((type) => ProductEntity, (order) => order.id)
  @JoinColumn()
  item: ProductEntity;

  @ManyToOne((type) => User, (user) => user.First_name)
  @JoinColumn()
  user: User;

 
}
