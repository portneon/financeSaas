import authService from "../services/auth.services";
import asyncHandler from "../utils/asyncHandler";

class AuthController {
    login = asyncHandler(async (req: any, res: any, next: any) => {
        const { email, password } = req.body;
        console.log(email, password);

        if (!email || !password) {
            return res.status(400).json({ status: "fail", message: "Email and password are required" });
        }

        try {
            const data = await authService.login(email, password);
            return res.status(200).json({ status: "success", data });
        } catch (error: any) {
            console.log(error);

            return res.status(401).json({ status: "fail", message: error.message });
        }
    });
    register = asyncHandler(async (req: any, res: any, next: any) => {
        const { name, email, password } = req.body;
        console.log(name, email, password);

        if (!name || !email || !password) {
            return res.status(400).json({ status: "fail", message: "Name, email and password are required" });
        }

        try {
            const data = await authService.register(name, email, password);
            return res.status(200).json({ status: "success", data });
        } catch (error: any) {
            console.log(error);

            return res.status(401).json({ status: "fail", message: error.message });
        }
    });
}

export default new AuthController();
