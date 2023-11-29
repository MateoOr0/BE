import { DataSource } from "typeorm";
import Producto from "./models/products";
import Usuario from "./models/usuarios";
import Carrito from "./models/Carrito";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "backend",
  synchronize: true,
  logging: true,
  entities: [Producto, Usuario, Carrito],
  subscribers: [],
  migrations: []
});
