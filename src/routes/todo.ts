import { Router } from 'express';
import { todo } from '../controllers';

const router = Router();

router.post('/', todo.create);

export default router;
