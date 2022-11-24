import { Router } from 'express';
import { user } from '../controllers';

const router = Router();

router.post('/signUp', user.signUp);
router.post('/signIn', user.signIn);
router.get('/duplicateCheckBy', user.duplicateCheckBy);

export default router;
