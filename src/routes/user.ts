import { Router } from 'express';
import { user } from '../controllers';
import tokenVerify from '../middlewares/tokenVerify';

const router = Router();

router.post('/signUp', user.signUp);
router.post('/signIn', user.signIn);
router.delete('/', tokenVerify, user.withdrawal);
router.patch('/', tokenVerify, user.update);
router.get('/duplicateCheckBy', user.duplicateCheckBy);

export default router;
