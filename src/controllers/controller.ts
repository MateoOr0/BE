import { Request, Response } from "express";
import { AppDataSource } from "../db";
import Producto from "../models/products";
import Usuario from "../models/usuarios";
import Carrito from "../models/Carrito";
import * as bcrypt from 'bcrypt';

export const llamar_productos = async(_: Request, res: Response) => {
  try {
    const productos = await AppDataSource.manager.find(Producto);
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const llamar_usuarios = async(_: Request, res: Response) => {
  try {
    const usuarios = await AppDataSource.manager.find(Usuario);
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const eliminarProducto = async (req: Request, res: Response) => {
  const { nombre } = req.params;

  try {
    const entityManager = AppDataSource.manager;
    const product = await entityManager.findOne(Producto, { where: { nombre } });

    if (!product) {
      return res.status(404).send(`Product ${nombre} not found`);
    }

    await entityManager.remove(product);
    return res.send(`Product ${nombre} deleted successfully`);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

export const register = async (req: Request, res: Response) => {
  const { nombre, email, contraseña, confirmPassword } = req.body;

  if (contraseña !== confirmPassword) {
    return res.status(400).send('Las contraseñas no coinciden');
  }

  const usuarioRepository = AppDataSource.getRepository(Usuario);

  try {
    const hashedContraseña = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = usuarioRepository.create({ nombre, email, contraseña: hashedContraseña });
    await usuarioRepository.save(nuevoUsuario);
    return res.status(201).send('Usuario registrado correctamente');
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).send('Error interno del servidor');
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, contraseña } = req.body;

  const usuarioRepository = AppDataSource.getRepository(Usuario);

  try {
    const usuario = await usuarioRepository.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).send('Usuario no encontrado');
    }

    const match = await bcrypt.compare(contraseña, usuario.contraseña);

    if (match) {
      return res.status(200).send('Inicio de sesión exitoso');
    } else {
      return res.status(401).send('Contraseña incorrecta');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).send('Error interno del servidor');
  }
};

export const registerCart = async (req: Request, res: Response) => {
  const { cartJson } = req.body;

  try {
    const cartEntity = new Carrito(cartJson);
    await AppDataSource.manager.save(Carrito, cartEntity);
    return res.status(201).json({ message: 'Carrito registrado exitosamente' });
  } catch (err) {
    console.error('Error al registrar el carrito:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }  
};
