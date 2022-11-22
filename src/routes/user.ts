import { Router } from 'express';
import { user } from '../controllers';
const router = Router();
router.post('/', user.signUp);

export default router;
