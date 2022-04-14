import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/user/entity/user.entity';
@Entity()
export class AddressEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;
 
  @Column()
  phonenumber: string;

  @Column()
  pincode: number;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  housenumber: string;

  @Column()
  roadname_area: string;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
