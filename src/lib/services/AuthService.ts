import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { UserRepository } from '../repositories/UserRepository';
import { LoginSchema, RegisterSchema } from '../validation/auth.schema';
import { AppError } from '../core/AppError';
import { EmailService } from './EmailService';

export class AuthService {
    private userRepository: UserRepository;
    private emailService: EmailService;
    private readonly JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';
    private readonly JWT_EXPIRES_IN = '1d';

    constructor(userRepository: UserRepository, emailService: EmailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    async register(data: RegisterSchema): Promise<{ user: User; token: string }> {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new AppError('User already exists', 400);
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(data.password, salt);

        const user = await this.userRepository.create({ ...data, passwordHash });
        const token = this.generateToken(user.id);

        // Send welcome email asynchronously
        this.emailService.sendWelcomeEmail(user.email, user.name || 'User');

        return { user, token };
    }

    async login(data: LoginSchema): Promise<{ user: User; token: string }> {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            throw new AppError('Invalid credentials', 401);
        }

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            throw new AppError('Invalid credentials', 401);
        }

        const token = this.generateToken(user.id);
        return { user, token };
    }

    async validateUser(userId: string): Promise<User | null> {
        return this.userRepository.findById(userId);
    }

    private generateToken(userId: string): string {
        return jwt.sign({ id: userId }, this.JWT_SECRET, {
            expiresIn: this.JWT_EXPIRES_IN,
        });
    }

    verifyToken(token: string): string | jwt.JwtPayload {
        return jwt.verify(token, this.JWT_SECRET);
    }
}
