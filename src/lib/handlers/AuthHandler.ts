import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '../services/AuthService';
import { Validator } from '../utils/Validator';
import { RegisterSchema, LoginSchema } from '../validation/auth.schema';
import { ApiResponse } from '../core/ApiResponse';

export class AuthHandler {
    constructor(private authService: AuthService) { }

    async register(req: NextRequest) {
        try {
            const body = await req.json();
            const data = await Validator.validate(RegisterSchema, body);
            const result = await this.authService.register(data);

            const response = NextResponse.json(ApiResponse.success(result, 'Registration successful', 201), { status: 201 });

            // Set JWT cookie
            response.cookies.set('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 86400, // 1 day
                path: '/',
            });

            return response;
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    async login(req: NextRequest) {
        try {
            const body = await req.json();
            const data = await Validator.validate(LoginSchema, body);
            const result = await this.authService.login(data);

            const response = NextResponse.json(ApiResponse.success(result, 'Login successful'));

            // Set JWT cookie
            response.cookies.set('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 86400, // 1 day
                path: '/',
            });

            return response;
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    async logout(req: NextRequest) {
        const response = NextResponse.json(ApiResponse.success(null, 'Logged out successfully'));
        response.cookies.delete('token');
        return response;
    }

    async me(req: NextRequest) {
        try {
            const userId = req.headers.get('x-user-id');
            if (!userId) {
                return NextResponse.json(ApiResponse.error('Unauthorized', 401), { status: 401 });
            }

            const user = await this.authService.validateUser(userId);
            if (!user) {
                return NextResponse.json(ApiResponse.error('User not found', 404), { status: 404 });
            }

            const { password, ...safeUser } = user;
            return NextResponse.json(ApiResponse.success(safeUser));
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
