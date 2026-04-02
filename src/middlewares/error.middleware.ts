import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        error = new ApiError(statusCode, message, false, err.stack);
    }

    const response = {
        status: "error",
        statusCode: error.statusCode,
        message: error.message,
    };

    res.status(error.statusCode).json(response);
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(404, `Not Found - ${req.originalUrl}`));
};
