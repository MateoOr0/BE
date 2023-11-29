import express from 'express';
import { getAllProducts } from '../controllers/ProductController';

const router = express.Router();

router.get('/', getAllProducts);

export default router;
