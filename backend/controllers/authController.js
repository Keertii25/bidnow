import bcrypt from 'bcryptjs';
import Seller from '../models/seller.js';
import Buyer from '../models/buyer.js';
import { createToken } from '../utils/jwt.js';

// Function to set the token in a cookie
const sendToken = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true, // only accessible via HTTP (cannot be accessed via JS)
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production', // only send cookies over HTTPS in production
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
  });
};

// Function to get the appropriate model (Seller or Buyer)
const getModel = (role) => (role === 'seller' ? Seller : Buyer);

// Signup handler for both Seller and Buyer
export const signup = async (req, res) => {
  const { name, email, username, password, role } = req.body;
  const Model = getModel(role);

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    // Create user in the DB
    const user = await Model.create({ name, email, username, password: hashedPassword });
    // Create the JWT token
    const token = createToken(user._id, role);
    // Send the token as a cookie
    sendToken(res, token);
    res.status(201).json({ message: `${role} registered successfully`, userId: user._id });
  } catch (error) {
    res.status(400).json({ error: 'Signup failed', details: error.message });
  }
};

export const login = async (req, res) => {
  const { emailOrUsername, password, role } = req.body;
  const Model = getModel(role);  // Get the model (Seller or Buyer based on the role)

  try {
    // Find user by email or username
    const user = await Model.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) return res.status(404).json({ error: `${role} not found` });

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

    // Create the JWT token
    const token = createToken(user._id, role);
    
    // Send the token as a cookie (optional, you can also return it in the response)
    sendToken(res, token);

    // Send success message along with userId (sellerId or buyerId)
    res.status(200).json({ message: 'Logged in successfully', userId: user._id });
  } catch (error) {
    res.status(400).json({ error: 'Login failed', details: error.message });
  }
};

// Placeholder for forgot password (this can be expanded later)
export const forgotPassword = (req, res) => {
  const { email } = req.body;
  // Send an email with reset token (you'd implement this later)
  res.json({ message: 'Password recovery link sent (if email exists)' });
};

