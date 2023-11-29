import express from 'express';
import router from './routes/index';
import { dbConnection } from './db';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.use('/api', router); 

dbConnection.then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
});