import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  refreshToken,
  getMe,
  logout,
  updateProfile,
  updateProfilePhoto,
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    validate,
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
    validate,
  ],
  login
);

router.post('/refresh', refreshToken);

router.get('/me', authenticate, getMe);

router.post('/logout', authenticate, logout);

router.put('/profile', authenticate, updateProfile);

router.put('/profile/photo', authenticate, updateProfilePhoto);

export default router;

