import { Router } from 'express';
import todo from './todo';
import user from './user';
import bookmark from './bookmark';

const router = Router();

router.use('/todo', todo);
router.use('/user', user);
router.use('/bookmark', bookmark);

export default router;
