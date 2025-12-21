import { NextRequest, NextResponse } from 'next/server';
import { IssueService } from '../services/IssueService';
import { Validator } from '../utils/Validator';
import { CreateIssueSchema, UpdateIssueSchema } from '../validation/issue.schema';
import { ApiResponse } from '../core/ApiResponse';

export class IssueHandler {
    constructor(private issueService: IssueService) { }

    private getUserId(req: NextRequest): string {
        const userId = req.headers.get('x-user-id');
        if (!userId) throw new Error('Unauthorized');
        return userId;
    }

    async list(req: NextRequest) {
        try {
            const userId = this.getUserId(req);
            const { searchParams } = new URL(req.url);
            const type = searchParams.get('type') || undefined;

            const issues = await this.issueService.getUserIssues(userId, type);
            return NextResponse.json(ApiResponse.success(issues));
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    async create(req: NextRequest) {
        try {
            const userId = this.getUserId(req);
            const body = await req.json();
            const data = await Validator.validate(CreateIssueSchema, body);

            const issue = await this.issueService.createIssue(userId, data);
            return NextResponse.json(ApiResponse.success(issue, 'Issue created successfully', 201), { status: 201 });
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    async getOne(req: NextRequest, { params }: { params: { id: string } }) {
        try {
            const userId = this.getUserId(req);
            const issue = await this.issueService.getIssueById(userId, params.id);
            if (!issue) return NextResponse.json(ApiResponse.error('Issue not found', 404), { status: 404 });

            return NextResponse.json(ApiResponse.success(issue));
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    async update(req: NextRequest, { params }: { params: { id: string } }) {
        try {
            const userId = this.getUserId(req);
            const body = await req.json();
            const data = await Validator.validate(UpdateIssueSchema, body);

            const issue = await this.issueService.updateIssue(userId, params.id, data);
            return NextResponse.json(ApiResponse.success(issue, 'Issue updated successfully'));
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    async delete(req: NextRequest, { params }: { params: { id: string } }) {
        try {
            const userId = this.getUserId(req);
            await this.issueService.deleteIssue(userId, params.id);
            return NextResponse.json(ApiResponse.success(null, 'Issue deleted successfully'));
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    private handleError(error: any) {
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Internal Server Error';
        return NextResponse.json(ApiResponse.error(message, statusCode), { status: statusCode });
    }
}
