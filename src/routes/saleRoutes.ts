import express from 'express';
import { makeSale } from '../controllers/SaleController';

const router = express.Router();

router.post('/make-sale', makeSale);

export default router;
