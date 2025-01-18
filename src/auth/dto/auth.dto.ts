import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsBoolean()
    @IsNotEmpty()
    isEmailVerified: boolean;

    // @IsDate()
    @IsNotEmpty()
    createdAt: Date;

    // @IsDate()
    @IsNotEmpty()
    updatedAt: Date;

    // @IsDate()
    @IsNotEmpty()
    lastLogin: Date;

    @IsString()
    authToken?: string;

    @IsString()
    refreshToken?: string;
}