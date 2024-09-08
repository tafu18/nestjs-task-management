import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async getAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);

        return createdUser.save();
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {

        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    }

    async show(id: string): Promise<User> {

        return this.userModel.findById(id);
    }

    async delete(id: Types.ObjectId): Promise<User> {
        return this.userModel.findOneAndDelete({ _id: id });
    }

    async findOneByUsername(username: string): Promise<User> {
        return this.userModel.findOne({username: username});
    }
}
