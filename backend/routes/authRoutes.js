import express from 'express';
import { signup, login, forgotPassword } from '../controllers/authController.js';

const router = express.Router();

// Seller and Buyer signup 
router.post('/signup', signup);

// Seller and Buyer login 
router.post('/login', login);

// Forgot password route (expand later) 
router.post('/forgot-password', forgotPassword);

export default router;
