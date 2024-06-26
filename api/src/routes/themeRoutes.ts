import { Router } from 'express';
import { createTheme, getThemes } from '../controllers/themeController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware(['admin']), createTheme);
router.get('/', getThemes);

export default router;
