import express from 'express';
import { getAllProducts } from '../controllers/ProductController';

const router = express.Router();

router.get('/', getAllProducts);
// Agrega más rutas según sea necesario...

export default router;
