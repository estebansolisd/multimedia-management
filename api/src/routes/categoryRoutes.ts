import { Router } from 'express';
import { createCategory, getCategories } from '../controllers/categoryController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware(['admin']), createCategory);
router.get('/', getCategories);

export default router;
