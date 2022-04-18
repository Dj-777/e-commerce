/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { CartEntity } from 'src/cart/cart.entity';
import { OrderEntity } from 'src/order/order.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Product_name: string;

  @Column()
  Desctiption: string;

  @Column()
  Price: number;

  @Column()
  Category: string;

  @Column()
  image: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(type => CartEntity, cart => cart.id)
  @JoinColumn()
  cart: CartEntity[]

  @ManyToOne(type => OrderEntity, order => order.id)
  @JoinColumn()
  order: OrderEntity[]
}
