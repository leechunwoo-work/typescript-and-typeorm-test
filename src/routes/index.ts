import { Router } from 'express';
import todo from './todo';
import user from './user';
import bookmark from './bookmark';
import character from './character';

const router = Router();

router.use('/todo', todo);
router.use('/user', user);
router.use('/bookmark', bookmark);
router.use('/character', character);

export default router;
