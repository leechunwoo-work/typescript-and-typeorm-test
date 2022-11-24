import { Router } from 'express';
import { user } from '../controllers';
import tokenVerify from '../middlewares/tokenVerify';

const router = Router();

router.post('/signUp', user.signUp);
router.post('/signIn', user.signIn);
router.delete('/signOut', tokenVerify, user.signOut);
router.delete('/update', tokenVerify, user.update);
router.get('/duplicateCheckBy', user.duplicateCheckBy);

export default router;
