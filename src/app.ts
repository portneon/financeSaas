import express from "express";
import adminRoutes from "./routes/admin.routes";
import authRoutes from "./routes/auth.routes";
import transactionRoutes from "./routes/transaction.routes";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";

import dashboardRoutes from "./routes/dashboard.routes";

const app = express();

app.use(express.json());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admins", adminRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.use('/', (req, res) => {
    res.send("Standard API is up");
});
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});