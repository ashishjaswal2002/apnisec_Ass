import { NextRequest } from 'next/server';
import { container } from '@/lib/core/Container';

export async function GET(req: NextRequest) {
    return container.userHandler.getProfile(req);
}

export async function PUT(req: NextRequest) {
    return container.userHandler.updateProfile(req);
}
