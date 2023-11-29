import { createConnection } from 'typeorm';
import { Product } from './entities/Product';
import { User } from './entities/User';
import { Sale } from './entities/Sale';

export const connectToDatabase = async (): Promise<void> => {
  try {
    await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'tu_base_de_datos',
      entities: [Product, User, Sale],
      synchronize: true,
    });
    console.log('Conexión exitosa con la base de datos');
  } catch (error) {
    console.error('TypeORM connection error: ', error);
  }
};


export const dbConnection = connectToDatabase();
