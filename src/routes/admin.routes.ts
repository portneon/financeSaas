import { Router } from "express";
import adminController from "../controllers/Admin.controller";
import { verifyToken, restrictTo } from "../middlewares/auth.middleware";

const router = Router();

// Middleware: Guard all these routes!
// Must be logged in, and exclusively an ADMIN.
router.use(verifyToken);
router.use(restrictTo("ADMIN"));

router.get("/:id/users", adminController.getAllUsers);

// Secure creation endpoint
router.post("/users", adminController.registerUser);

export default router;
