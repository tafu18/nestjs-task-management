import { IsIn, IsInt, IsNotEmpty, IsString, Max, Min, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: 'Username is required' })
    username: string;
  
    @IsInt()
    @Min(18, { message: 'Age must be at least 18' })
    @Max(120, { message: 'Age cannot be more than 120' })
    age: number;
  
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    @IsString()
    @IsIn(['admin', 'user', 'moderator'], { message: 'Role must be either admin, user, or moderator' })
    role: string;
}