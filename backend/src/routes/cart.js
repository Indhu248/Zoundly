import express from 'express';
import { body } from 'express-validator';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getCart);

router.post(
  '/',
  [
    body('productId').notEmpty().withMessage('Product ID is required'),
    body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    validate,
  ],
  addToCart
);

router.put(
  '/:itemId',
  [
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    validate,
  ],
  updateCartItem
);

router.delete('/:itemId', removeFromCart);

router.delete('/', clearCart);

export default router;

