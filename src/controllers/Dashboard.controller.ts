import dashboardService from "../services/dashboard.services";
import asyncHandler from "../utils/asyncHandler";

class DashboardController {
    overview = asyncHandler(async (req: any, res: any) => {
        const userId = req.user.id;
        const data = await dashboardService.getDashboard(userId, req.query);
        res.status(200).json({ status: "success", data });
    });

    trends = asyncHandler(async (req: any, res: any) => {
        const userId = req.user.id;
        const trends = await dashboardService.getTrends(userId, req.query);
        res.status(200).json({ status: "success", data: { trends } });
    });
}

export default new DashboardController();
