import { IsString, IsInt, IsOptional, Min, Max, MinLength, IsEmail, IsIn } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @MinLength(3, { message: 'Username must be at least 3 characters long' })
    username?: string;

    @IsInt()
    @IsOptional()
    @Min(18, { message: 'Age must be at least 18' })
    @Max(120, { message: 'Age cannot be more than 120' })
    age?: number;

    @IsString()
    @IsOptional()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password?: string;
    
    @IsString()
    @IsIn(['admin', 'user', 'moderator'], { message: 'Role must be either admin, user, or moderator' })
    role?: string;
}
