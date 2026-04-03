"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("../utils/ApiError");
const JWT_SECRET = process.env.JWT_SECRET || "development-secret-key-12345";
const verifyToken = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new ApiError_1.ApiError(401, "You are not logged in. Please log in to get access."));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user info to request (id, role, etc)
        next();
    }
    catch (error) {
        return next(new ApiError_1.ApiError(401, "Invalid token or token has expired."));
    }
};
exports.verifyToken = verifyToken;
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ApiError_1.ApiError(403, "You do not have permission to perform this action"));
        }
        next();
    };
};
exports.restrictTo = restrictTo;
