import { NextRequest } from 'next/server';
import { container } from '@/lib/core/Container';

// Next.js App Router dynamic route params handling
type Props = {
    params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, { params }: Props) {
    const resolvedParams = await params;
    return container.issueHandler.getOne(req, { params: resolvedParams });
}

export async function PUT(req: NextRequest, { params }: Props) {
    const resolvedParams = await params;
    return container.issueHandler.update(req, { params: resolvedParams });
}

export async function DELETE(req: NextRequest, { params }: Props) {
    const resolvedParams = await params;
    return container.issueHandler.delete(req, { params: resolvedParams });
}
