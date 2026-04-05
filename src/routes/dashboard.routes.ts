import { Router } from "express";
import dashboardController from "../controllers/Dashboard.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.use(verifyToken);

router.get("/", dashboardController.overview);
router.get("/trends", dashboardController.trends);


export default router;
