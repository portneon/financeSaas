import { Router } from "express";
import adminController from "../controllers/Admin.controller";
import { verifyToken, restrictTo } from "../middlewares/auth.middleware";

const router = Router();


router.use(verifyToken);
router.use(restrictTo("ADMIN"));

router.get("/:id/users", adminController.getAllUsers);

router.post("/users", adminController.registerUser);

export default router;
