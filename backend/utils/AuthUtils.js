import jwt from 'jsonwebtoken';

export const getUserFromToken = (req) => {
  const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1]; // Get token from cookies or Authorization header

  if (!token) {
    return null;  // No token, no user
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Assuming you have a JWT_SECRET environment variable
    return decoded.userId; // The userId is encoded in the token
  } catch (error) {
    console.error('Invalid or expired token:', error);
    return null;  // Invalid token
  }
};
