import { Router } from 'express';
import { getLeaderboard, getPlayerRank, updateGameCompletion } from '../controllers/leaderboardController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Get top players leaderboard
router.get('/', getLeaderboard);

// Get specific player's rank
router.get('/rank/:userId', getPlayerRank);

// Update game completion (protected)
router.post('/complete/:userId', authenticate, updateGameCompletion);

export default router;
