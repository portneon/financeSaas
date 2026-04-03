"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Admin_controller_1 = __importDefault(require("../controllers/Admin.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Middleware: Guard all these routes!
// Must be logged in, and exclusively an ADMIN.
router.use(auth_middleware_1.verifyToken);
router.use((0, auth_middleware_1.restrictTo)("ADMIN"));
router.get("/:id/users", Admin_controller_1.default.getAllUsers);
// Secure creation endpoint
router.post("/users", Admin_controller_1.default.registerUser);
exports.default = router;
