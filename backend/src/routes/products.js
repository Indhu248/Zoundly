import express from 'express';
import { body } from 'express-validator';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProduct);

router.post(
  '/',
  authenticate,
  authorize('admin'),
  [
    body('name').notEmpty().withMessage('Product name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category')
      .isIn(['earphones', 'headphones', 'speakers', 'watches'])
      .withMessage('Invalid category'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('originalPrice').isNumeric().withMessage('Original price must be a number'),
    body('stockQuantity').isInt({ min: 0 }).withMessage('Stock quantity must be a positive integer'),
    validate,
  ],
  createProduct
);

router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  updateProduct
);

router.delete('/:id', authenticate, authorize('admin'), deleteProduct);

export default router;

