import express from 'express';
import { getCheckup, getCheckupHistory, saveCheckup, deleteCheckup } from '../controllers/checkupController.js';
import { authenticateToken } from './authMiddleware.js';

const router = express.Router();

router.post('/predict/:id', authenticateToken, saveCheckup); // Ensure user is authenticated before saving checkup
router.get('/history/:id', authenticateToken, getCheckupHistory); // Ensure user is authenticated before fetching history
router.get('/checkup/:id', authenticateToken, getCheckup); // Ensure user is authenticated before fetching single checkup
router.delete('/checkup/:id', authenticateToken, deleteCheckup); // Ensure user is authenticated before deleting checkup

export default router;
