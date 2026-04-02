import prisma from "../configs/prisma.config";

class TransactionRepo {
    async create(data: any) {
        return await prisma.transaction.create({ data });
    }

    async findAll(userId: string) {
        return await prisma.transaction.findMany({
            where: { userId },
            orderBy: { date: "desc" }
        });
    }

    async findById(id: string) {
        return await prisma.transaction.findUnique({ where: { id } });
    }

    async update(id: string, data: any) {
        return await prisma.transaction.update({ where: { id }, data });
    }

    async delete(id: string) {
        return await prisma.transaction.delete({ where: { id } });
    }
}

export default new TransactionRepo();
