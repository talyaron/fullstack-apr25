import { Router } from 'express';
import { index, create, show, update, destroy } from '../controllers/event.controller';

const router = Router();

router.get('/', index);
router.post('/', create);
router.get('/:id', show);
router.patch('/:id', update);
router.delete('/:id', destroy);

export default router;
