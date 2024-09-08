
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.usersService.getAll();
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto){
        return this.usersService.create(createUserDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto){
        return this.usersService.update(id, updateUserDto);
    }

    @Get(':id')
    show(@Param('id') id: string){
        return this.usersService.show(id);
    }

    @Delete(':id')
    delete(@Param('id') id: Types.ObjectId){
        return this.usersService.delete(id);
    }

}
