import prisma from "../configs/prisma.config";

class AuthRepo {
    constructor() { }

    async findByEmail(email: string) {
        return await prisma.users.findUnique({
            where: { email },
        });
    }

    async createAdmin(name: string, email: string, password: string) {
        return await prisma.users.create({
            data: {
                name,
                email,
                password,
                role: "ADMIN",
            },
        });
    }
}

export default new AuthRepo();
