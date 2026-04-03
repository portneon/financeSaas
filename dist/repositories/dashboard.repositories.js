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
class DashboardRepo {
    buildWhereClause(userId, filters) {
        const where = { userId };
        if (filters.startDate || filters.endDate) {
            where.date = {};
            if (filters.startDate)
                where.date.gte = filters.startDate;
            if (filters.endDate)
                where.date.lte = filters.endDate;
        }
        if (filters.category) {
            where.category = filters.category;
        }
        if (filters.type) {
            where.type = filters.type;
        }
        return where;
    }
    getSummary(userId, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const where = this.buildWhereClause(userId, filters);
            const result = yield prisma_config_1.default.transaction.groupBy({
                by: ["type"],
                where,
                _sum: { amount: true },
            });
            let totalIncome = null;
            let totalExpenses = null;
            for (const row of result) {
                if (row.type === "INCOME")
                    totalIncome = (_a = row._sum.amount) !== null && _a !== void 0 ? _a : 0;
                if (row.type === "EXPENSE")
                    totalExpenses = (_b = row._sum.amount) !== null && _b !== void 0 ? _b : 0;
            }
            return {
                totalIncome,
                totalExpenses,
                netBalance: totalIncome - totalExpenses,
            };
        });
    }
    getCategoryTotals(userId, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = this.buildWhereClause(userId, filters);
            const result = yield prisma_config_1.default.transaction.groupBy({
                by: ["category", "type"],
                where,
                _sum: { amount: true },
            });
            return result.map((row) => ({
                category: row.category,
                type: row.type,
                total: row._sum.amount || 0,
            }));
        });
    }
    getRecentActivity(userId_1) {
        return __awaiter(this, arguments, void 0, function* (userId, limit = 10) {
            return yield prisma_config_1.default.transaction.findMany({
                where: { userId },
                orderBy: { date: "desc" },
                take: limit,
            });
        });
    }
    getTrends(userId_1, filters_1) {
        return __awaiter(this, arguments, void 0, function* (userId, filters, granularity = "monthly") {
            const conditions = [`t.userId = '${userId}'`];
            if (filters.startDate) {
                conditions.push(`t.date >= '${filters.startDate.toISOString().slice(0, 10)}'`);
            }
            if (filters.endDate) {
                conditions.push(`t.date <= '${filters.endDate.toISOString().slice(0, 10)}'`);
            }
            if (filters.category) {
                conditions.push(`t.category = '${filters.category}'`);
            }
            if (filters.type) {
                conditions.push(`t.type = '${filters.type}'`);
            }
            const whereClause = conditions.join(" AND ");
            let periodExpression;
            if (granularity === "weekly") {
                periodExpression = `CONCAT(YEAR(t.date), '-W', LPAD(WEEK(t.date, 1), 2, '0'))`;
            }
            else {
                periodExpression = `CONCAT(YEAR(t.date), '-', LPAD(MONTH(t.date), 2, '0'))`;
            }
            const query = `
            SELECT 
                ${periodExpression} AS period,
                SUM(CASE WHEN t.type = 'INCOME' THEN t.amount ELSE 0 END) AS income,
                SUM(CASE WHEN t.type = 'EXPENSE' THEN t.amount ELSE 0 END) AS expense
            FROM Transaction t
            WHERE ${whereClause}
            GROUP BY period
            ORDER BY period ASC
        `;
            const result = yield prisma_config_1.default.$queryRawUnsafe(query);
            return result.map((row) => ({
                period: row.period,
                income: Number(row.income) || 0,
                expense: Number(row.expense) || 0,
            }));
        });
    }
}
exports.default = new DashboardRepo();
