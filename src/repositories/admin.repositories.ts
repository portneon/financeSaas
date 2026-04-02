import prisma from "../configs/prisma.config";

class AdminRepo {
    constructor() { }

    findAll(id: string) {
        return prisma.users.findMany({ where: { adminId: id } });
    }

    async createUser(data: any) {
        return await prisma.users.create({ data });
    }
}

export default new AdminRepo();
