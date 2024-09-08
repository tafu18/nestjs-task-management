import { IsString, IsNotEmpty, IsOptional, IsEnum, IsMongoId } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class CreateTaskDto{
    @IsString()
    @IsNotEmpty({ message: 'Title cannot be empty' })
    title: string;

    @IsString()
    @IsOptional()
    description?: string;
  
    @IsString()
    @IsEnum(TaskStatus, { message: 'Status must be one of the following: open, in_progress, done' })
    status?: TaskStatus;

    @IsMongoId()
    @IsNotEmpty({ message: 'User ID is required' })
    user_id: string;
}