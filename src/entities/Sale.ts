import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './Product';
import { User } from './User';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product)
  product!: Product;

  @ManyToOne(() => User)
  user!: User;

  @Column('datetime')
  saleDate!: Date;

}
