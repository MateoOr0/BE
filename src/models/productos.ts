import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Producto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  descripcion!: string;

  @Column()
  precio!: number;

  @Column()
  cantidad!: number;

  constructor(nombre: string, descripcion: string, precio: number, cantidad: number) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.cantidad = cantidad;
  }
}
