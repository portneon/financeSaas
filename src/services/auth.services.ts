import authRepo from "../repositories/auth.repositories";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "development-secret-key-12345";

class AuthService {
    async login(email: string, passwordPlain: string) {
        const user = await authRepo.findByEmail(email);
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(passwordPlain, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

        const { password, ...userWithoutPassword } = user;

        return { user: userWithoutPassword, token };
    }
}

export default new AuthService();
