import { Router } from 'express';
import { register, login, me } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/me', me);

export default router;
