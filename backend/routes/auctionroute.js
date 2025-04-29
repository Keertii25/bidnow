
import express from 'express';
import { requireAuth, authorizeSeller, checkAuctionOwnership} from '../middleware/authMiddleware.js';  // Import your new middlewares
import { createAuction, getAllAuctions, getAuctionById, updateAuction,deleteAuction } from '../controllers/auctionController.js';
import Auction from '../models/auctions.js';
import { placeBid, getTopBidsForAuction,getAllBidsForAuction } from '../controllers/bidController.js';
import { authenticateBuyer } from '../middleware/authMiddleware.js';
import { get } from 'mongoose';

const router = express.Router();

// Route to create a new auction (Seller only)
router.post('/', requireAuth, authorizeSeller, createAuction);

// Route to get all auctions (Public)
router.get('/', getAllAuctions);

// Route to get live auctions
router.get('/live', async (req, res) => {
  try {
    const now = new Date();

    const liveAuctions = await Auction.find({
      startTime: { $lte: now },
      endTime: { $gte: now }
    })
      .sort({ startTime: 1 }) // Sort by soonest starting
      .limit(2)
      .populate('seller'); // Populate seller info

    res.json(liveAuctions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while fetching live auctions.' });
  }
});

// Route to get a specific auction by ID (Public)
router.get('/:id', getAuctionById);

// Route to update an auction (Seller only & Ownership check)
router.put('/:id', requireAuth, authorizeSeller, checkAuctionOwnership, updateAuction);
router.delete('/:id', requireAuth, checkAuctionOwnership, deleteAuction);

// Get all bids (or top 3) for an auction
router.get('/:id/bids', getTopBidsForAuction);
router.get('/:id/allbids', getAllBidsForAuction);
router.post('/:id/bid', authenticateBuyer, (req, res, next) => {
  console.log('Received POST request for auction ID:', req.params.id);
  next(); // Proceed to the placeBid handler
}, placeBid);


export default router;

