"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const ApiError_1 = require("../utils/ApiError");
const errorHandler = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError_1.ApiError)) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        error = new ApiError_1.ApiError(statusCode, message, false, err.stack);
    }
    const response = {
        status: "error",
        statusCode: error.statusCode,
        message: error.message,
    };
    res.status(error.statusCode).json(response);
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res, next) => {
    next(new ApiError_1.ApiError(404, `Not Found - ${req.originalUrl}`));
};
exports.notFoundHandler = notFoundHandler;
