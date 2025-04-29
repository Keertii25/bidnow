import Auction from '../models/auctions.js';
import { getUserFromToken } from '../utils/AuthUtils.js';
import mongoose from 'mongoose';

export const createAuction = async (req, res) => {
  try {
    const { title, description, image, startingPrice, startTime, endTime, seller } = req.body;

    if (!title || !description || !image || !startingPrice || !startTime || !endTime || !seller) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const sellerId = new mongoose.Types.ObjectId(seller);  // Convert sellerId to ObjectId

    const newAuction = new Auction({
      title,
      description,
      image,
      startingPrice,
      startTime,
      endTime,
      seller: sellerId,
    });

    await newAuction.save();
    res.status(201).json({ message: 'Auction created successfully!' });
  } catch (error) {
    console.error('Error creating auction:', error);
    res.status(500).json({ error: 'Error creating auction', details: error.message });
  }
};


export const getAllAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find().populate('seller');
    res.status(200).json(auctions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controllers/auctionController.js
export const getAuctionById = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id)
      .populate('seller')
      .populate({
        path: 'bids',
        options: { sort: { 'currentPrice': -1 }, limit: 3 }, // Top 3 highest bids
      });

    if (!auction) return res.status(404).json({ error: 'Auction not found' });

    // Get current time and compare with start and end times
    const currentTime = new Date();
    const startTime = new Date(auction.startTime);  // Ensure these are Date objects
    const endTime = new Date(auction.endTime);

    // Determine auction status based on current time
    if (currentTime < startTime) {
      auction.status = 'upcoming';  // Auction has not started yet
    } else if (currentTime >= startTime && currentTime <= endTime) {
      auction.status = 'live';  // Auction is ongoing
    } else {
      auction.status = 'ended';  // Auction has ended
    }

    res.status(200).json(auction);  // Return auction with updated status
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAuction = async (req, res) => {
  try {
    const { title, description, startingPrice, endTime } = req.body;
    const auction = req.auction; // From the checkAuctionOwnership middleware

    auction.title = title || auction.title;
    auction.description = description || auction.description;
    auction.startingPrice = startingPrice || auction.startingPrice;
    auction.endTime = endTime || auction.endTime;

    await auction.save();
    return res.status(200).json(auction);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
export const deleteAuction = async (req, res) => {
  try {
    // Find and delete the auction by ID
    const auction = await Auction.findByIdAndDelete(req.params.id);

    // If the auction doesn't exist, send a 404 response
    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    // Send success message
    res.status(200).json({ message: 'Auction deleted successfully' });
  } catch (err) {
    // Handle errors (e.g., database issues)
    res.status(500).json({ error: err.message });
  }
};
