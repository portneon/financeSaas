import prisma from "../configs/prisma.config";
import { Prisma } from "../generated/prisma/client";

interface DashboardFilters {
    startDate?: Date;
    endDate?: Date;
    category?: string;
    type?: "INCOME" | "EXPENSE";
}

class DashboardRepo {
    private buildWhereClause(userId: string, filters: DashboardFilters) {
        const where: any = { userId };

        if (filters.startDate || filters.endDate) {
            where.date = {};
            if (filters.startDate) where.date.gte = filters.startDate;
            if (filters.endDate) where.date.lte = filters.endDate;
        }

        if (filters.category) {
            where.category = filters.category;
        }

        if (filters.type) {
            where.type = filters.type;
        }

        return where;
    }

    async getSummary(userId: string, filters: DashboardFilters) {
        const where = this.buildWhereClause(userId, filters);

        const result = await prisma.transaction.groupBy({
            by: ["type"],
            where,
            _sum: { amount: true },
        });
        let totalIncome: number | null = null;
        let totalExpenses: number | null = null;

        for (const row of result) {
            if (row.type === "INCOME") totalIncome = row._sum.amount ?? 0;
            if (row.type === "EXPENSE") totalExpenses = row._sum.amount ?? 0;
        }
        return {
            totalIncome,
            totalExpenses,
            netBalance: totalIncome - totalExpenses,
        };
    }

    async getCategoryTotals(userId: string, filters: DashboardFilters) {
        const where = this.buildWhereClause(userId, filters);

        const result = await prisma.transaction.groupBy({
            by: ["category", "type"],
            where,
            _sum: { amount: true },
        });

        return result.map((row) => ({
            category: row.category,
            type: row.type,
            total: row._sum.amount || 0,
        }));
    }

    async getRecentActivity(userId: string, limit: number = 10) {
        return await prisma.transaction.findMany({
            where: { userId },
            orderBy: { date: "desc" },
            take: limit,
        });
    }

    async getTrends(userId: string, filters: DashboardFilters, granularity: "monthly" | "weekly" = "monthly") {
        const conditions: string[] = [`t.userId = '${userId}'`];

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

        let periodExpression: string;
        if (granularity === "weekly") {
            periodExpression = `CONCAT(YEAR(t.date), '-W', LPAD(WEEK(t.date, 1), 2, '0'))`;
        } else {
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

        const result: any[] = await prisma.$queryRawUnsafe(query);

        return result.map((row) => ({
            period: row.period,
            income: Number(row.income) || 0,
            expense: Number(row.expense) || 0,
        }));
    }
}

export default new DashboardRepo();
