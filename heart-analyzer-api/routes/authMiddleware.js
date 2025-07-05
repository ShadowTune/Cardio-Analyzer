import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import process from 'process';
dotenv.config();

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!token) return res.sendStatus(401); // Unauthorized
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden

    req.user = user;
    next();
  });
};
