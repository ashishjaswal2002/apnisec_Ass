import { NextRequest } from 'next/server';
import { container } from '@/lib/core/Container';

export async function POST(req: NextRequest) {
    return container.authHandler.login(req);
}
