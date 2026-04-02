import { Router } from "express";
import authController from "../controllers/Auth.controller";

const router = Router();

router.post("/login", authController.login);

export default router;
