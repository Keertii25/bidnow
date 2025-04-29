import Bid from '../models/Bid.js';
import Auction from '../models/auctions.js';

export const placeBid = async (req, res) => {
  try {
    const { bidAmount } = req.body;
    const auctionId = req.params.id; // Get auction ID from URL parameters
    const userId = req.user.id; // Assuming you have authentication middleware that attaches user info

    // Ensure bid amount is valid
    if (!bidAmount || typeof bidAmount !== 'number' || bidAmount <= 0) {
      return res.status(400).json({ error: 'Invalid bid amount' });
    }

    // Check if the auction exists
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    // Check if the bid amount is higher than the current price
    if (bidAmount <= auction.currentPrice) {
      return res.status(400).json({ error: 'Bid must be higher than the current price' });
    }

    // Create the new bid
    const bid = new Bid({
      amount: bidAmount,
      bidder: userId,  // The userId of the logged-in buyer
      auction: auctionId,
    });

    // Save the bid
    await bid.save();

    // Update auction's current price
    auction.currentPrice = bidAmount;
    await auction.save();

    // Respond with the new bid
    res.status(201).json({ message: 'Bid placed successfully', bid });
  } catch (error) {
    console.error('Error placing bid:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTopBidsForAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.query.limit) || 3;

    // Ensure auction exists
    const auction = await Auction.findById(id);
    if (!auction) return res.status(404).json({ error: 'Auction not found' });

    const bids = await Bid.find({ auction: id })
      .sort({ amount: -1 }) // Highest first
      .limit(limit)
      .populate('bidder', 'username');

    // Optional: format response
    const formattedBids = bids.map((bid) => ({
      _id: bid._id,
      amount: bid.amount,
      bidderName: bid.bidder?.username || 'Unknown',
    }));

    res.json(formattedBids);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch bids' });
  }
};

export const getAllBidsForAuction = async (req, res) => {
  try {
    const { id } = req.params;  // Auction ID from the URL

    // Ensure auction exists
    const auction = await Auction.findById(id);
    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    // Fetch all bids for the auction, sorted by timestamp (latest first)
    const bids = await Bid.find({ auction: id })
      .sort({ timestamp: -1 })  // Sorting bids by timestamp (latest first)
      .populate('bidder', 'username');  // Populate bidder's username

    // If no bids found, return a message
    if (bids.length === 0) {
      return res.status(404).json({ error: 'No bids placed for this auction' });
    }

    res.json(bids);  // Return all bids for the auction
  } catch (err) {
    console.error('Error fetching bids:', err);
    res.status(500).json({ error: 'Failed to fetch bids' });
  }
};
