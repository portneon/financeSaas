import { Router } from "express";
import transactionController from "../controllers/Transaction.controller";
import { verifyToken, restrictTo } from "../middlewares/auth.middleware";

const router = Router();

router.use(verifyToken);
router.use(restrictTo("ADMIN"));

router.post("/", transactionController.create);
router.get("/", transactionController.getAll);
router.get("/:id", transactionController.getById);
router.put("/:id", transactionController.update);
router.delete("/:id", transactionController.delete);

export default router;
