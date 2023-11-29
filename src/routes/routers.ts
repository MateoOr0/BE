import express from "express";
import { llamar_productos, eliminarProducto, login, register, llamar_usuarios, registerCart } from "../controllers/controller";
const inicial = express.Router();
inicial.use(express.json());

inicial.get('/', (_, res) => {
  res.send('The sedulous hyena at tehe antelope!');
});

inicial.get("/productos", llamar_productos);
inicial.get("/usuarios", llamar_usuarios);
inicial.delete('/productos/:nombre', eliminarProducto);
inicial.post('/login', login);
inicial.post('/registrarse', register);
inicial.post('/comprar', registerCart);

export default inicial;
