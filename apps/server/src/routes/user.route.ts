import { Router } from 'express';
import { getUser } from '../controllers';

export const router = Router();

// get user
router.get('/', getUser);

export const userRouter = router;
