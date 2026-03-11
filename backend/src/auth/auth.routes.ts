import { AuthController } from "@/auth/auth.controller.js";
import { Router } from "express";

const router = Router();

const authController = new AuthController();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

export default router;
