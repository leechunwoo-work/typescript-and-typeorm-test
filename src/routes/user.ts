import { Router } from 'express';
import { user } from '../controllers';

const router = Router();

router.post('/signup', user.signUp);

export default router;
