import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";

const JWT_SECRET = process.env.JWT_SECRET || "development-secret-key-12345";
// i have used any as req type because i dont want to create interface and extend user class but ideally i have to do that.

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new ApiError(401, "You are not logged in. Please log in to get access."));
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return next(new ApiError(401, "Invalid token or token has expired."));
    }
};

export const restrictTo = (...roles: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return next(new ApiError(403, "You do not have permission to perform this action"));
        }
        next();
    };
};
