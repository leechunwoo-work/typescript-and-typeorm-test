import { Router } from 'express';
import { character } from '../controllers';
import tokenVerify from '../middlewares/tokenVerify';

const router = Router();

router.post('/represent', tokenVerify, character.select);
router.patch('/represent', tokenVerify, character.change);
// router.post('/', tokenVerify, character.create);

export default router;
