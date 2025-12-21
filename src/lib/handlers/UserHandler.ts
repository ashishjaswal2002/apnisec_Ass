import { NextRequest, NextResponse } from 'next/server';
import { UserRepository } from '../repositories/UserRepository';
import { Validator } from '../utils/Validator';
import { ApiResponse } from '../core/ApiResponse';
import { IsString, IsOptional } from 'class-validator';

class UpdateProfileDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    email?: string;
}

import { EmailService } from '../services/EmailService';

export class UserHandler {
    constructor(
        private userRepository: UserRepository,
        private emailService: EmailService
    ) { }

    private getUserId(req: NextRequest): string {
        const userId = req.headers.get('x-user-id');
        if (!userId) throw new Error('Unauthorized');
        return userId;
    }

    async getProfile(req: NextRequest) {
        try {
            const userId = this.getUserId(req);
            const user = await this.userRepository.findById(userId);
            if (!user) return NextResponse.json(ApiResponse.error('User not found', 404), { status: 404 });

            const { password, ...safeUser } = user;
            return NextResponse.json(ApiResponse.success(safeUser));
        } catch (error: any) {
            return NextResponse.json(ApiResponse.error('Internal Error', 500), { status: 500 });
        }
    }

    async updateProfile(req: NextRequest) {
        try {
            const userId = this.getUserId(req);
            const body = await req.json();
            const data = await Validator.validate(UpdateProfileDto, body);

            const user = await this.userRepository.update(userId, data);

            // Send notification
            if (user.email) {
                await this.emailService.sendProfileUpdateNotification(user.email, user.name || 'User');
            }

            const { password, ...safeUser } = user;
            return NextResponse.json(ApiResponse.success(safeUser));
        } catch (error: any) {
            return NextResponse.json(ApiResponse.error(error.message || 'Internal Error', 500), { status: 500 });
        }
    }
}
