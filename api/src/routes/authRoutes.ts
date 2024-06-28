import { Router } from "express";
import { register, login, me } from "../controllers/authController";

const router = Router();

router.post("/register", register);
router.post("/me", me);
router.post("/login", login);

export default router;
