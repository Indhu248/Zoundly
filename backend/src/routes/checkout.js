import express from 'express';
import { body } from 'express-validator';
import {
  initiateCheckout,
  verifyCheckout,
} from '../controllers/orderController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

router.post(
  '/initiate',
  authenticate,
  [
    body('items').isArray({ min: 1 }).withMessage('Items array is required'),
    body('items.*.productId').optional().notEmpty().withMessage('Product ID is required'),
    body('items.*.id').optional().notEmpty().withMessage('Product ID is required'),
    body('items.*.quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('shippingAddress.name').notEmpty().withMessage('Name is required'),
    body('shippingAddress.email').isEmail().withMessage('Valid email is required'),
    body('shippingAddress.phone').notEmpty().withMessage('Phone is required'),
    body('shippingAddress.address').notEmpty().withMessage('Address is required'),
    body('shippingAddress.city').notEmpty().withMessage('City is required'),
    body('shippingAddress.pincode').notEmpty().withMessage('Pincode is required'),
    validate,
  ],
  initiateCheckout
);

router.post(
  '/verify',
  [
    body('orderId').notEmpty().withMessage('Order ID is required'),
    body('paymentId').notEmpty().withMessage('Payment ID is required'),
    body('signature').notEmpty().withMessage('Signature is required'),
    validate,
  ],
  verifyCheckout
);

export default router;

