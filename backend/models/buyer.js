import mongoose from 'mongoose';

const buyerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }],
}, { timestamps: true });

const Buyer = mongoose.model('Buyer', buyerSchema);
export default Buyer;
