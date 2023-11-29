import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const userRepository = getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }


    const newUser = userRepository.create({ username, email, password });
    await userRepository.save(newUser);

    return res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error en el registro:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email, password } });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    return res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
