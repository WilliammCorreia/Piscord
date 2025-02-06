import { IsString, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsOptional()
    avatarUrl: string;

    @IsBoolean()
    @IsNotEmpty()
    setOffline: boolean;
}