import jwt from 'jsonwebtoken';
import Auction from '../models/auctions.js';
import Buyer from '../models/buyer.js';
 // Adjust the path as necessary

// Middleware to check if user is authenticated
export const requireAuth = (req, res, next) => {
  const token = req.cookies?.token;

  // If no token is found in the cookies
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token found' });
  }

  try {
    // Decode the token using the JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to request object
    next(); // Proceed to the next middleware
  } catch (err) {
    console.error('JWT Verification Error:', err);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

// Middleware to authorize only sellers
export const authorizeSeller = (req, res, next) => {
  // Ensure that the user has a role of 'seller'
  if (req.user?.role !== 'seller') {
    return res.status(403).json({ error: 'Forbidden: Seller access only' });
  }
  next(); // Proceed to the next middleware or handler
};

// Middleware to authorize only buyers
export const authorizeBuyer = (req, res, next) => {
  if (req.user.role !== 'buyer') {
    return res.status(403).json({ error: 'Forbidden: Buyer access only' });
  }
  next();
};

// Middleware to check if the authenticated user owns the auction
export const checkAuctionOwnership = async (req, res, next) => {
  const auctionId = req.params.id;

  try {
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    // Check if the logged-in seller owns this auction
    if (auction.seller.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden: You do not own this auction' });
    }

    // Attach auction data to request for further use
    req.auction = auction;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};


export const protect = (role) => (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== role) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Not authorized' });
  }
};

export const authenticateBuyer = async (req, res, next) => {
  const token = req.cookies.token;
  console.log('Received token:', token);  // Log token to check if it's being received

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);  // Log decoded token to ensure it's correct

    const user = await Buyer.findById(decoded.id);
    console.log('User found:', user);  // Log user to see if it's correctly retrieved from the database

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: 'buyer',
    };  // Attach the user to the request object
    next();  // Proceed to the next handler
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};