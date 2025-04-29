import mongoose from 'mongoose';

const auctionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  startingPrice: { type: Number, required: true },
  currentPrice: { type: Number, default: 0 },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }],
  status: {
    type: String,
    enum: ['upcoming', 'live', 'ended'],
    default: 'upcoming',
  },
}, { timestamps: true });

const Auction = mongoose.model('Auction', auctionSchema);
export default Auction;
