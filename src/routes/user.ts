import { Router } from 'express';
import { user } from '../controllers';
import tokenVerify from '../middlewares/tokenVerify';

const router = Router();

router.post('/signUp', user.signUp);
router.post('/signIn', user.signIn);
router.delete('/', tokenVerify, user.withdrawal);
router.patch('/', tokenVerify, user.update);
<<<<<<< HEAD
router.get('/duplicate', user.duplicateCheckBy);
=======
router.get('/duplicateCheckBy', user.duplicateCheckBy);
router.get('/mypage', tokenVerify, user.getMyPageData);
>>>>>>> feature/character-CRUD

export default router;
