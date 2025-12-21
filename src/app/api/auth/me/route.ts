import { NextRequest } from 'next/server';
import { container } from '@/lib/core/Container';

export async function GET(req: NextRequest) {
    return container.authHandler.me(req);
}
