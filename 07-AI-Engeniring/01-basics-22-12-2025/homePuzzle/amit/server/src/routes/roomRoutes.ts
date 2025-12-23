import { Router } from 'express';
import { getRoomById, movePlayer } from '../controllers/roomController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/:id', authenticate, getRoomById);
router.post('/move', authenticate, movePlayer);

export default router;
