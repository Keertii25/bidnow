import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  bidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Buyer',
    required: true,
  },
  auction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auction',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

const Bid = mongoose.model('Bid', bidSchema);
export default Bid;
