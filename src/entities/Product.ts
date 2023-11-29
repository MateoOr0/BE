import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  author!: string;

  @Column()
  description!: string;

  @Column()
  image!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;
}
