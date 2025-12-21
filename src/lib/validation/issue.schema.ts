import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum IssueType {
    CLOUD_SECURITY = 'Cloud Security',
    RETEAM_ASSESSMENT = 'Reteam Assessment',
    VAPT = 'VAPT',
}

export class CreateIssueSchema {
    @IsNotEmpty()
    @IsEnum(IssueType, { message: 'Type must be Cloud Security, Reteam Assessment, or VAPT' })
    type!: string;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsOptional()
    priority?: string;

    @IsString()
    @IsOptional()
    status?: string;
}

export class UpdateIssueSchema {
    @IsString()
    @IsOptional()
    type?: string;

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    priority?: string;

    @IsString()
    @IsOptional()
    status?: string;
}
