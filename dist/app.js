"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const transaction_routes_1 = __importDefault(require("./routes/transaction.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/admins", admin_routes_1.default);
app.use("/api/v1/transactions", transaction_routes_1.default);
app.use("/api/v1/dashboard", dashboard_routes_1.default);
app.use('/', (req, res) => {
    res.send("Standard API is up");
});
app.use(error_middleware_1.notFoundHandler);
app.use(error_middleware_1.errorHandler);
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
