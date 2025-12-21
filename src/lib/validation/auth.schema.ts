import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterSchema {
    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email!: string;

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password!: string;

    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name!: string;
}

export class LoginSchema {
    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email!: string;

    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    password!: string;
}
