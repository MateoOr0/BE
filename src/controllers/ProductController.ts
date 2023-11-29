import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../entities/Product';

export const getAllProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const productRepository = getRepository(Product);
    const products = await productRepository.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


