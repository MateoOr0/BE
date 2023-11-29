import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Sale } from '../entities/Sale';

export const makeSale = async (req: Request, res: Response): Promise<void> => {
  try {
    const saleRepository = getRepository(Sale);
    const newSale = saleRepository.create(req.body);
    await saleRepository.save(newSale);
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Agrega más funciones según sea necesario...
