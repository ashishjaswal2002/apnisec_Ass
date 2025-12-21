
import { PrismaClient } from '@prisma/client';

async function main() {
    console.log('Testing DB connection...');
    const prisma = new PrismaClient();
    try {
        await prisma.$connect();
        console.log('Connected to DB successfully!');
        const userCount = await prisma.user.count();
        console.log('User count:', userCount);
    } catch (error) {
        console.error('DB Connection failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
