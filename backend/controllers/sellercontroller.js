import Seller from '../models/seller.js';
import {ExpressError} from '../utils/ExpressError.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const newSeller = new Seller({ name, email, password }); // Hash password in real setup
  await newSeller.save();

  res.status(201).json({ message: 'Seller registered', seller: newSeller });
};

export const getAllSellers = async (req, res) => {
  const sellers = await Seller.find({});
  res.status(200).json(sellers);
};

export const getSellerById = async (req, res) => {
  const { id } = req.params;
  const seller = await Seller.findById(id).populate('products');
  if (!seller) throw new ExpressError(404, 'Seller not found');
  res.status(200).json(seller);
};