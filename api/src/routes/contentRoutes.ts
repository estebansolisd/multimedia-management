import { Router } from 'express';
import { createContent, getContents } from '../controllers/contentController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware(['creator', 'admin']), createContent);
router.get('/', getContents);

export default router;
