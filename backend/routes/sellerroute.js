import express from 'express';
import { register, getAllSellers, getSellerById } from '../controllers/sellercontroller.js';

const router = express.Router();

router.post('/register', register);
router.get('/', getAllSellers);
router.get('/:id', getSellerById);

export default router;