import transactionService from "../services/transaction.services";
import asyncHandler from "../utils/asyncHandler";

class TransactionController {
    create = asyncHandler(async (req: any, res: any) => {
        const userId = req.user.id;
        const transaction = await transactionService.createTransaction(userId, req.body);
        res.status(201).json({ status: "success", data: { transaction } });
    });

    getAll = asyncHandler(async (req: any, res: any) => {
        const userId = req.user.id;
        const transactions = await transactionService.getAllTransactions(userId);
        res.status(200).json({ status: "success", data: { transactions } });
    });

    getById = asyncHandler(async (req: any, res: any) => {
        const { id } = req.params;
        const transaction = await transactionService.getTransactionById(id);
        res.status(200).json({ status: "success", data: { transaction } });
    });

    update = asyncHandler(async (req: any, res: any) => {
        const { id } = req.params;
        const userId = req.user.id;
        const transaction = await transactionService.updateTransaction(id, userId, req.body);
        res.status(200).json({ status: "success", data: { transaction } });
    });

    delete = asyncHandler(async (req: any, res: any) => {
        const { id } = req.params;
        const userId = req.user.id;
        await transactionService.deleteTransaction(id, userId);
        res.status(200).json({ status: "success", message: "Transaction deleted successfully" });
    });
}

export default new TransactionController();
