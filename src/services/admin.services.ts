import adminRepo from "../repositories/admin.repositories";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError";

class AdminService {
    async getAllUsers(adminId: string) {
        return await adminRepo.findAll(adminId);
    }

    async registerUser(adminId: string, userData: any) {
        // Enforce strong validation
        if (userData.role !== "ANALYST" && userData.role !== "VIEWER") {
            throw new ApiError(400, "Admins can only register ANALYST or VIEWER roles.");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const newUser = await adminRepo.createUser({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            role: userData.role,
            adminId: adminId
        });

        // Exclude return password
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }
}

export default new AdminService();