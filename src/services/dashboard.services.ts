import dashboardRepo from "../repositories/dashboard.repositories";

class DashboardService {
    async getDashboard(userId: string, query: any) {
        const filters = this.parseFilters(query);

        const [summary, categoryTotals, recentActivity] = await Promise.all([
            dashboardRepo.getSummary(userId, filters),
            dashboardRepo.getCategoryTotals(userId, filters),
            dashboardRepo.getRecentActivity(userId, 10)
        ]);

        return {
            summary,
            categoryTotals,
            recentActivity
        };
    }

    async getTrends(userId: string, query: any) {
        const filters = this.parseFilters(query);
        const granularity = query.granularity === "weekly" ? "weekly" : "monthly";

        return await dashboardRepo.getTrends(userId, filters, granularity);
    }

    private parseFilters(query: any) {
        const filters: any = {};

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

export default new DashboardService();
