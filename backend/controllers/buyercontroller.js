import Buyer from '../models/buyer.js';

export const createBuyer = async (req, res) => {
  try {
    const buyer = await Buyer.create(req.body);
    res.status(201).json(buyer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.status(200).json(buyers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
