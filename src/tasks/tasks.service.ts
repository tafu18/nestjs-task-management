/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Task } from './schemas/tasks.schema';
import { Model, ObjectId, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

    async getAll(): Promise<Task[]> {
        return this.taskModel.find().populate('user_id', ['username','age'] ).exec();
    }

    async show(id: string): Promise<Task> {
        return this.taskModel.findById(id).populate('user_id', ['username','age']).exec();
    }

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        const createdTask = new this.taskModel(createTaskDto);

        return createdTask.save();
    }

    async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
    }

    async delete(id: string) {
        return this.taskModel.findByIdAndDelete(id)
    }
}
