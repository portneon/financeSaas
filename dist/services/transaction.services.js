"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_repositories_1 = __importDefault(require("../repositories/transaction.repositories"));
const ApiError_1 = require("../utils/ApiError");
class TransactionService {
    createTransaction(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.amount || !data.type || !data.category || !data.date) {
                throw new ApiError_1.ApiError(400, "Amount, type, category, and date are required");
            }
            if (data.type !== "INCOME" && data.type !== "EXPENSE") {
                throw new ApiError_1.ApiError(400, "Type must be INCOME or EXPENSE");
            }
            return yield transaction_repositories_1.default.create({
                amount: data.amount,
                type: data.type,
                category: data.category,
                date: new Date(data.date),
                notes: data.notes || null,
                userId
            });
        });
    }
    getAllTransactions(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield transaction_repositories_1.default.findAll(userId);
        });
    }
    getTransactionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield transaction_repositories_1.default.findById(id);
            if (!transaction) {
                throw new ApiError_1.ApiError(404, "Transaction not found");
            }
            return transaction;
        });
    }
    updateTransaction(id, userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield transaction_repositories_1.default.findById(id);
            if (!transaction) {
                throw new ApiError_1.ApiError(404, "Transaction not found");
            }
            return yield transaction_repositories_1.default.update(id, Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (data.amount !== undefined && { amount: data.amount })), (data.type !== undefined && { type: data.type })), (data.category !== undefined && { category: data.category })), (data.date !== undefined && { date: new Date(data.date) })), (data.notes !== undefined && { notes: data.notes })));
        });
    }
    // ideally transcation delete nahi hona chaiye kyon ki ye pura finaincial tracking ko barbad kar dega 
    // but for now we are implementing it assigment me that may be itis correct
    deleteTransaction(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield transaction_repositories_1.default.findById(id);
            if (!transaction) {
                throw new ApiError_1.ApiError(404, "Transaction not found");
            }
            return yield transaction_repositories_1.default.delete(id);
        });
    }
}
exports.default = new TransactionService();
