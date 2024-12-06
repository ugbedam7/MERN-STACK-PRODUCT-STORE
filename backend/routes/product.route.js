import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct
} from '../controllers/product.controller.js';
const router = express.Router();

// Get all products route
router.get('/', getProducts);

// Create product route
router.post('/', createProduct);

// Update product route
router.put('/:id', updateProduct);

// Delete product route
router.delete('/:id', deleteProduct);

export default router;
