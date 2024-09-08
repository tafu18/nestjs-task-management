import { IsString, IsOptional, IsEnum, IsMongoId } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(TaskStatus, { message: 'Status must be one of the following: open, in_progress, done' })
    @IsOptional()
    status?: TaskStatus;

    @IsMongoId()
    @IsOptional()
    user_id?: string;
}
