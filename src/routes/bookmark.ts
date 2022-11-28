import { Router } from 'express';
import { bookmark } from '../controllers';
import tokenVerify from '../middlewares/tokenVerify';

const router = Router();

router.post('/', tokenVerify, bookmark.create);
router.delete('/', tokenVerify, bookmark.remove);
router.patch('/', tokenVerify, bookmark.update);
router.get('/', tokenVerify, bookmark.getList);

export default router;
