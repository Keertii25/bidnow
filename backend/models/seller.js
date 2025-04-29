// models/seller.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const sellerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { // Will be hashed
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Auction',
    }
  ],
  verified: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;