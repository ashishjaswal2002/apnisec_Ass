import { NextRequest } from 'next/server';
import { container } from '@/lib/core/Container';

export async function GET(req: NextRequest) {
    return container.issueHandler.list(req);
}

export async function POST(req: NextRequest) {
    return container.issueHandler.create(req);
}
