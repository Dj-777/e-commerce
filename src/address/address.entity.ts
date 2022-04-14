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

import { User } from 'src/user/entity/user.entity';
@Entity()
export class AddressEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    add1: string;


    @Column()
    add2: string;

    @Column()
    street: string;


    @Column()
    pincode: number;

    @Column()
    state: string;

    @Column()
    city: string;


    @OneToOne((type) => User, (user) => user.Email)
    @JoinColumn()
    user: User;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;


}
