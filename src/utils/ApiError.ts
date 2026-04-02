export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(statusCode: number, message: string, isOperational = true, stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        if (stack) {
            this.stack = stack;
        } else if (process.env.NODE_ENV === "development") {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
