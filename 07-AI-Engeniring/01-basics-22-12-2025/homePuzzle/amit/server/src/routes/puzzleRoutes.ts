import { Router } from 'express';
import { getPuzzleById, verifyPuzzleSolution, getPuzzlesByRoom } from '../controllers/puzzleController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Get a specific puzzle by ID
router.get('/:puzzleId', getPuzzleById);

// Get all puzzles for a specific room
router.get('/room/:roomId', getPuzzlesByRoom);

// Verify puzzle solution (protected route)
router.post('/verify', authenticate, verifyPuzzleSolution);

export default router;
