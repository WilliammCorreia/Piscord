import { IsString, IsBoolean, IsArray, MinLength, MaxLength, IsNotEmpty, IsOptional } from 'class-validator';

export class UserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(32)
    username: string;

    @IsString()
    @IsOptional()
    avatarUrl?: string;

    @IsBoolean()
    @IsOptional()
    setOffline?: boolean;

    @IsString()
    @IsOptional()
    bio?: string;

    @IsBoolean()
    @IsOptional()
    isOnline?: boolean;

    @IsString()
    @IsOptional()
    roles?: string;

    @IsArray()
    @IsOptional()
    friends?: string[];

    @IsArray()
    @IsOptional()
    blockedUsers?: string[];

    @IsArray()
    @IsOptional()
    servers?: string[];
}