import express from 'express';
import { body } from 'express-validator';
import {
  getOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder,
} from '../controllers/orderController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getOrders);

router.get('/:id', getOrder);

router.put(
  '/:id/status',
  authorize('admin'),
  [
    body('status')
      .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
      .withMessage('Invalid status'),
    validate,
  ],
  updateOrderStatus
);

router.post('/:id/cancel', cancelOrder);

export default router;

