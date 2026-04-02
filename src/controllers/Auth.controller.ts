import authService from "../services/auth.services";
import asyncHandler from "../utils/asyncHandler";

class AuthController {
    login = asyncHandler(async (req: any, res: any, next: any) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: "fail", message: "Email and password are required" });
        }

        try {
            const data = await authService.login(email, password);
            return res.status(200).json({ status: "success", data });
        } catch (error: any) {

            return res.status(401).json({ status: "fail", message: error.message });
        }
    });
}

export default new AuthController();
