import { Router } from 'express';
import { bookmark } from '../controllers';
import tokenVerify from '../middlewares/tokenVerify';

const router = Router();

router.post('/', bookmark.create);
router.delete('/', bookmark.remove);
router.patch('/', bookmark.update);
router.get('/', bookmark.getList);

export default router;
