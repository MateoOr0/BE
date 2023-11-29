import express from 'express';
import productRoutes from './productRoutes';
import userRoutes from './userRoutes';
import saleRoutes from './saleRoutes';

const router = express.Router();

router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/sales', saleRoutes);

export default router;