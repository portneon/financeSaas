"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Transaction_controller_1 = __importDefault(require("../controllers/Transaction.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.verifyToken);
router.use((0, auth_middleware_1.restrictTo)("ADMIN"));
router.post("/", Transaction_controller_1.default.create);
router.get("/", Transaction_controller_1.default.getAll);
router.get("/:id", Transaction_controller_1.default.getById);
router.put("/:id", Transaction_controller_1.default.update);
router.delete("/:id", Transaction_controller_1.default.delete);
exports.default = router;
