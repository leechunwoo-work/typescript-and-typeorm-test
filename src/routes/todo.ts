import { Router } from 'express';
import { todo } from '../controllers';

const router = Router();

router.post('/', todo.create);
router.put('/', todo.update);
router.patch('/complete', todo.complete);
router.get('/list', todo.getList);

export default router;
