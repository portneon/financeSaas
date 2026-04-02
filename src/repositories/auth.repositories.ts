import prisma from "../configs/prisma.config";

class AuthRepo {
    constructor() { }

    async findByEmail(email: string) {
        return await prisma.users.findUnique({
            where: { email },
        });
    }
}

export default new AuthRepo();
