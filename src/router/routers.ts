import express, { Request, Response } from 'express';

const router = express.Router();

// Lista de productos
const productos = [
  { nombre: 'El Principito', modelo: '123', precio: 50, paisOrigen: 'Francia' },
  { nombre: 'Don Quijote de la Mancha', modelo: '456', precio: 120, paisOrigen: 'España' },
  // Otros productos
];

router.use(express.json());

// 1. Obtener todos los productos....
router.get('/productos', (_req: Request, _res: Response) => {
  _res.json(productos);
});

// Redireccionar la ruta raíz a "/productos"...
router.get('/', (_req: Request, _res: Response) => {
  _res.redirect('/productos');
});

// 2. Obtener productos cuyo precio sea mayor a 100.....
router.get('/productos/mayor100', (_req: Request, _res: Response) => {
  const productosMayores100 = productos.filter((producto) => producto.precio > 100);
  _res.json(productosMayores100);
});

// 3. Modificar un producto existente o manejar el caso en que no exista....
router.put('/productos/:modelo', (_req: Request, _res: Response) => {
  const modelo = _req.params.modelo;
  const nuevoProducto = _req.body;

  const index = productos.findIndex((producto) => producto.modelo === modelo);

  if (index !== -1) {
    productos[index] = nuevoProducto;
    _res.json(productos[index]);
  } else {
    _res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// 4. Eliminar un producto por su modelo o manejar el caso en que no exista.....
router.delete('/productos/:modelo', (_req: Request, _res: Response) => {
  const modelo = _req.params.modelo;

  const index = productos.findIndex((producto) => producto.modelo === modelo);

  if (index !== -1) {
    productos.splice(index, 1);
    _res.json({ message: 'Producto eliminado' });
  } else {
    _res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// 5. Obtener un producto por su país de origen....
router.get('/productos/pais/:paisOrigen', (req: Request, res: Response) => {
  const paisOrigen = req.params.paisOrigen;
  const productosPorPais = productos.filter((producto) => producto.paisOrigen === paisOrigen);

  if (productosPorPais.length > 0) {
    res.json(productosPorPais);
  } else {
    res.status(404).json({ error: 'Pais no encontrado' });
  }
});

// 6. Obtener un producto por su precio....
router.get('/productos/precio/:precio', (_req: Request, _res: Response) => {
  const precio = parseFloat(_req.params.precio);
  const productoPorPrecio = productos.find((producto) => producto.precio === precio);

  if (productoPorPrecio) {
    _res.json(productoPorPrecio);
  } else {
    _res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// 7. Crear un nuevo producto si posee las mismas claves que los productos existentes....
router.post('/productos', (_req: Request, _res: Response) => {
  const nuevoProducto = _req.body;
  const keysProducto = Object.keys(nuevoProducto);

  const tieneLasMismasClaves = productos.every((producto) => {
    const keysProductoExistente = Object.keys(producto);
    return keysProducto.every((key) => keysProductoExistente.includes(key));
  });

  if (tieneLasMismasClaves) {
    productos.push(nuevoProducto);
    _res.json(nuevoProducto);
  } else {
    _res.status(400).json({ error: 'El nuevo producto no tiene las mismas claves que los productos existentes' });
  }
});

export default router;
