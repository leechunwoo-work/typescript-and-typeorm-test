import { Router } from 'express';
import { todo } from '../controllers';
import tokenVerify from '../middlewares/tokenVerify';

const router = Router();

router.post('/', tokenVerify, todo.create);
router.put('/', tokenVerify, todo.update);
router.patch('/complete', tokenVerify, todo.complete);
router.get('/list', tokenVerify, todo.getList);
router.delete('/', tokenVerify, todo.remove);

export default router;
