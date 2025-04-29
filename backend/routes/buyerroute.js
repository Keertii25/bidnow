import express from 'express';
import { createBuyer, getAllBuyers } from '../controllers/buyercontroller.js';

const router = express.Router();

router.post('/', createBuyer);
router.get('/', getAllBuyers);

export default router;
