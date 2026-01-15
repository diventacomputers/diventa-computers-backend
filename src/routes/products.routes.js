import { Router } from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deactivateProduct,
  deleteProduct
} from '../controllers/products.controller.js';

const router = Router();

// Rutas públicas (sin autenticación)
router.get('/', getProducts);
router.get('/:id', getProductById);

// Rutas protegidas (deberían llevar autenticación después)
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.patch('/:id/deactivate', deactivateProduct);
router.delete('/:id', deleteProduct);

export default router;
