import { Router } from 'express';
import todo from './todo';

const router = Router();

router.use('/todo', todo);
// router.use('/user', require('./user'));

export default router;
