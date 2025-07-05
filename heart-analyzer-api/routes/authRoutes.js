import express from 'express';
import { register, login, updateUser, getProfile, logout, guestLogin } from '../controllers/authController.js';
import { authenticateToken } from './authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile/:id', authenticateToken, getProfile); // Placeholder for getProfile
router.put('/edit-profile/:id', authenticateToken, updateUser); // ✅ fixed here
router.post('/logout', logout); // Ensure this is a POST request
router.post('/guest-login', guestLogin); // Ensure this is a POST request


export default router;
