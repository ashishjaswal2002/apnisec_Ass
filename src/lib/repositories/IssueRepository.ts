import { PrismaClient, Issue } from '@prisma/client';
import { CreateIssueSchema, UpdateIssueSchema } from '../validation/issue.schema';

export class IssueRepository {
    private db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    async create(userId: string, data: CreateIssueSchema): Promise<Issue> {
        return this.db.issue.create({
            data: {
                ...data,
                userId,
            },
        });
    }

    async findAll(userId: string, filterType?: string): Promise<Issue[]> {
        return this.db.issue.findMany({
            where: {
                userId,
                ...(filterType ? { type: filterType } : {}),
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string): Promise<Issue | null> {
        return this.db.issue.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: UpdateIssueSchema): Promise<Issue> {
        return this.db.issue.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<Issue> {
        return this.db.issue.delete({
            where: { id },
        });
    }
}
