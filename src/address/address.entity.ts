import { User } from 'src/entity/user.entity';
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

@Entity()
export class AddressEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  phonenumber: string;

  @Column()
  pincode: string;

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
