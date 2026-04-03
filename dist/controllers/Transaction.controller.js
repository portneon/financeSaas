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
const transaction_services_1 = __importDefault(require("../services/transaction.services"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
class TransactionController {
    constructor() {
        this.create = (0, asyncHandler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const transaction = yield transaction_services_1.default.createTransaction(userId, req.body);
            res.status(201).json({ status: "success", data: { transaction } });
        }));
        this.getAll = (0, asyncHandler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const transactions = yield transaction_services_1.default.getAllTransactions(userId);
            res.status(200).json({ status: "success", data: { transactions } });
        }));
        this.getById = (0, asyncHandler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const transaction = yield transaction_services_1.default.getTransactionById(id);
            res.status(200).json({ status: "success", data: { transaction } });
        }));
        this.update = (0, asyncHandler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userId = req.user.id;
            const transaction = yield transaction_services_1.default.updateTransaction(id, userId, req.body);
            res.status(200).json({ status: "success", data: { transaction } });
        }));
        this.delete = (0, asyncHandler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userId = req.user.id;
            yield transaction_services_1.default.deleteTransaction(id, userId);
            res.status(200).json({ status: "success", message: "Transaction deleted successfully" });
        }));
    }
}
exports.default = new TransactionController();
