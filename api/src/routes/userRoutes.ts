import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.post('/', userController.createUserController);
router.get('/', userController.getUsersController);
router.get('/:id', userController.getUserByIdController);
router.put('/:id', userController.updateUserController);
router.delete('/:id', userController.deleteUserController);

export { router as userRouter };