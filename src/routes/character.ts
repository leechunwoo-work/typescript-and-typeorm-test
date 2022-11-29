import { Router } from 'express';
import { character } from '../controllers';
import tokenVerify from '../middlewares/tokenVerify';

const router = Router();

router.post('/select', tokenVerify, character.select);
router.post('/', tokenVerify, character.create);
router.get('/', tokenVerify, character.find);
// router.put('/', tokenVerify, character.update);

export default router;
