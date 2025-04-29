import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Buyer from '../models/buyer.js';
import Seller from '../models/seller.js';
import Auction from '../models/auctions.js';
import Bid from '../models/Bid.js';

dotenv.config();

const MONGODB_URI = 'mongodb://127.0.0.1:27017/bidnow';

await mongoose.connect(MONGODB_URI);
console.log('🌱 Connected to DB for seeding...');

try {
  // Clear old data
  await Promise.all([
    Buyer.deleteMany({}),
    Seller.deleteMany({}),
    Auction.deleteMany({}),
    Bid.deleteMany({})
  ]);

  // Create Buyers
  const [buyer1, buyer2] = await Buyer.insertMany([
    { username: 'alice', email: 'alice@example.com', password: 'pass123' },
    { username: 'bob', email: 'bob@example.com', password: 'pass456' }
  ]);

  // Create Seller
  const seller = await Seller.create({
    name: 'Vintage Vault',
    email: 'seller@example.com',
    password: 'sellerpass',
    verified: true
  });

  // Create Auctions
  const auction1 = await Auction.create({
    title: 'Hermes 3000 Typewriter',
    description: 'A vintage Hermes 3000 typewriter in mint condition.',
    image: 'https://typewriterreview.com/wp-content/uploads/2021/01/hermes-3000-1.jpeg',
    startingPrice: 100,
    currentPrice: 150,
    startTime: new Date(Date.now() - 3600000),
    endTime: new Date(Date.now() + 86400000),
    seller: seller._id,
    status: 'live'
  });

  const auction2 = await Auction.create({
    title: 'Royal Quiet De Luxe Typewriter',
    description: 'Classic Royal QDL from the 1950s with smooth typing action.',
    image: 'https://images.stockcake.com/public/b/0/5/b05eb987-42f3-4f3a-9eda-1c4fef09a71e_large/vintage-typewriter-aesthetic-stockcake.jpg',
    startingPrice: 80,
    currentPrice: 95,
    startTime: new Date(Date.now() - 7200000),
    endTime: new Date(Date.now() + 43200000),
    seller: seller._id,
    status: 'live'
  });
  const auction3 = await Auction.create({
    title: 'Vintage Ford Mustang',
    description: 'Classic 1965 Ford Mustang in excellent condition.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/1965_Ford_Mustang_2D_Hardtop_Front.jpg/1200px-1965_Ford_Mustang_2D_Hardtop_Front.jpg',
    startingPrice: 5000,
    currentPrice: 6200,
    startTime: new Date(Date.now() - 5400000),
    endTime: new Date(Date.now() + 43200000),
    seller: seller._id,
    status: 'live',
  });
  
  const auction4 = await Auction.create({
    title: 'Victorian Antique Chair',
    description: 'Elegant wooden chair from the Victorian era.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEsRqHNGgV29WuoSEQhU2FodzapneUCSfrVg&s',
    startingPrice: 300,
    currentPrice: 350,
    startTime: new Date(Date.now() - 7200000),
    endTime: new Date(Date.now() + 86400000),
    seller: seller._id,
    status: 'live',
  });
  
  const auction5 = await Auction.create({
    title: 'Rare Art Painting',
    description: 'Abstract oil painting by unknown artist.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSj647oeFM71-wM5OKXZoTjHPCg0cw2MzyhA&s',
    startingPrice: 1500,
    currentPrice: 1750,
    startTime: new Date(Date.now() - 3600000),
    endTime: new Date(Date.now() + 172800000),
    seller: seller._id,
    status: 'live',
  });
  
  const auction6 = await Auction.create({
    title: 'Modern Bookshelf Collection',
    description: 'Set of rare philosophy and literature books.',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=500&q=80',
    startingPrice: 120,
    currentPrice: 160,
    startTime: new Date(Date.now() - 1800000),
    endTime: new Date(Date.now() + 43200000),
    seller: seller._id,
    status: 'live',
  });
  // Update seller with auctions
  seller.products = [auction1._id, auction2._id];
  await seller.save();

  // Create Bids
  const bid1 = await Bid.create({
    amount: 120,
    bidder: buyer1._id,
    auction: auction1._id
  });

  const bid2 = await Bid.create({
    amount: 150,
    bidder: buyer2._id,
    auction: auction1._id
  });

  const bid3 = await Bid.create({
    amount: 90,
    bidder: buyer1._id,
    auction: auction2._id
  });

  // Update auctions with bids
  auction1.bids = [bid1._id, bid2._id];
  auction1.currentPrice = 150;
  await auction1.save();

  auction2.bids = [bid3._id];
  auction2.currentPrice = 90;
  await auction2.save();

  // Update buyers with bid references
  buyer1.bids.push(bid1._id, bid3._id);
  buyer2.bids.push(bid2._id);
  await buyer1.save();
  await buyer2.save();

  console.log('✅ Database seeded successfully with interconnected data!');
  process.exit(0);
} catch (err) {
  console.error('❌ Error seeding DB:', err);
  process.exit(1);
}

