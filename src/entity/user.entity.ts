import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Gender } from 'src/components/userRegister.enum';

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
