import jwt from 'jsonwebtoken';

export const createToken = (userId, role) => {
  return jwt.sign({ id: userId, role },  process.env.JWT_SECRET, { expiresIn: '3d' });
};