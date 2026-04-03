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
const prisma_config_1 = __importDefault(require("../configs/prisma.config"));
class TransactionRepo {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.transaction.create({ data });
        });
    }
    findAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.transaction.findMany({
                where: { userId },
                orderBy: { date: "desc" }
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.transaction.findUnique({ where: { id } });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.transaction.update({ where: { id }, data });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.transaction.delete({ where: { id } });
        });
    }
}
exports.default = new TransactionRepo();
