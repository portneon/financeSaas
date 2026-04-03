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
const dashboard_repositories_1 = __importDefault(require("../repositories/dashboard.repositories"));
class DashboardService {
    getDashboard(userId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const filters = this.parseFilters(query);
            const [summary, categoryTotals, recentActivity] = yield Promise.all([
                dashboard_repositories_1.default.getSummary(userId, filters),
                dashboard_repositories_1.default.getCategoryTotals(userId, filters),
                dashboard_repositories_1.default.getRecentActivity(userId, 10)
            ]);
            return {
                summary,
                categoryTotals,
                recentActivity
            };
        });
    }
    getTrends(userId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const filters = this.parseFilters(query);
            const granularity = query.granularity === "weekly" ? "weekly" : "monthly";
            return yield dashboard_repositories_1.default.getTrends(userId, filters, granularity);
        });
    }
    parseFilters(query) {
        const filters = {};
        if (query.startDate) {
            filters.startDate = new Date(query.startDate);
        }
        if (query.endDate) {
            filters.endDate = new Date(query.endDate);
        }
        if (query.category) {
            filters.category = query.category;
        }
        if (query.type && (query.type === "INCOME" || query.type === "EXPENSE")) {
            filters.type = query.type;
        }
        return filters;
    }
}
exports.default = new DashboardService();
