import { IssueRepository } from '../repositories/IssueRepository';
import { UserRepository } from '../repositories/UserRepository';
import { EmailService } from './EmailService';
import { CreateIssueSchema, UpdateIssueSchema } from '../validation/issue.schema';
import { Issue } from '@prisma/client';
import { AppError } from '../core/AppError';

export class IssueService {
    constructor(
        private issueRepository: IssueRepository,
        private userRepository: UserRepository,
        private emailService: EmailService
    ) { }

    async createIssue(userId: string, data: CreateIssueSchema): Promise<Issue> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        const issue = await this.issueRepository.create(userId, data);

        // Send email notification
        await this.emailService.sendIssueNotification(
            user.email,
            issue.title,
            user.email,
            issue.description,
            issue.type
        );

        return issue;
    }

    async getUserIssues(userId: string, type?: string): Promise<Issue[]> {
        return this.issueRepository.findAll(userId, type);
    }

    async getIssueById(userId: string, issueId: string): Promise<Issue | null> {
        const issue = await this.issueRepository.findById(issueId);
        if (!issue) return null;

        // Ensure user owns the issue
        if (issue.userId !== userId) {
            throw new AppError('Forbidden', 403);
        }
        return issue;
    }

    async updateIssue(userId: string, issueId: string, data: UpdateIssueSchema): Promise<Issue> {
        const issue = await this.getIssueById(userId, issueId);
        if (!issue) throw new AppError('Issue not found', 404);

        return this.issueRepository.update(issueId, data);
    }

    async deleteIssue(userId: string, issueId: string): Promise<void> {
        const issue = await this.getIssueById(userId, issueId);
        if (!issue) throw new AppError('Issue not found', 404);

        await this.issueRepository.delete(issueId);
    }
}
