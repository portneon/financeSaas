"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Dashboard_controller_1 = __importDefault(require("../controllers/Dashboard.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.verifyToken);
router.get("/", Dashboard_controller_1.default.overview);
router.get("/trends", Dashboard_controller_1.default.trends);
exports.default = router;
