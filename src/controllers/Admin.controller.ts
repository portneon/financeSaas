import adminService from "../services/admin.services";
import asyncHandler from "../utils/asyncHandler";

class AdminController {
    getAllUsers = asyncHandler(async (req: any, res: any) => {
        const { id } = req.params;
        const subordinates = await adminService.getAllUsers(id);
        res.status(200).json(subordinates);
    });

    registerUser = asyncHandler(async (req: any, res: any) => {

        const adminId = req.user.id;

        const newUser = await adminService.registerUser(adminId, req.body);

        res.status(201).json({
            status: "success",
            data: { user: newUser }
        });
    });
}

export default new AdminController();