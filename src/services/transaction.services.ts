import transactionRepo from "../repositories/transaction.repositories";
import { ApiError } from "../utils/ApiError";

class TransactionService {
    async createTransaction(userId: string, data: any) {
        if (!data.amount || !data.type || !data.category || !data.date) {
            throw new ApiError(400, "Amount, type, category, and date are required");
        }

        if (data.type !== "INCOME" && data.type !== "EXPENSE") {
            throw new ApiError(400, "Type must be INCOME or EXPENSE");
        }

        return await transactionRepo.create({
            amount: data.amount,
            type: data.type,
            category: data.category,
            date: new Date(data.date),
            notes: data.notes || null,
            userId
        });
    }

    async getAllTransactions(userId: string) {
        return await transactionRepo.findAll(userId);
    }

    async getTransactionById(id: string) {
        const transaction = await transactionRepo.findById(id);
        if (!transaction) {
            throw new ApiError(404, "Transaction not found");
        }
        return transaction;
    }

    async updateTransaction(id: string, userId: string, data: any) {
        const transaction = await transactionRepo.findById(id);
        if (!transaction) {
            throw new ApiError(404, "Transaction not found");
        }

        return await transactionRepo.update(id, {
            ...(data.amount !== undefined && { amount: data.amount }),
            ...(data.type !== undefined && { type: data.type }),
            ...(data.category !== undefined && { category: data.category }),
            ...(data.date !== undefined && { date: new Date(data.date) }),
            ...(data.notes !== undefined && { notes: data.notes }),
        });
    }
    // ideally transcation delete nahi hona chaiye kyon ki ye pura finaincial tracking ko barbad kar dega 
    // but for now we are implementing it assigment me that may be itis correct
    async deleteTransaction(id: string, userId: string) {
        const transaction = await transactionRepo.findById(id);
        if (!transaction) {
            throw new ApiError(404, "Transaction not found");
        }

        return await transactionRepo.delete(id);
    }
}

export default new TransactionService();
