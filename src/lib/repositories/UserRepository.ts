import { PrismaClient, User } from '@prisma/client';
import { RegisterSchema } from '../validation/auth.schema';

export class UserRepository {
    private db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    async create(data: RegisterSchema & { passwordHash: string }): Promise<User> {
        return this.db.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: data.passwordHash,
            },
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.db.user.findUnique({
            where: { email },
        });
    }

    async findById(id: string): Promise<User | null> {
        return this.db.user.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        return this.db.user.update({
            where: { id },
            data,
        });
    }
}
