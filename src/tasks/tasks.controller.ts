import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @UseGuards(JwtAuthGuard)
    @Roles('admin')
    @Get()
    getAll(@Req() request: any) {
        const user = request.user; // JWT'den alınan kullanıcı bilgileri
        console.log('User Info:', user); // Kullanıcı bilgilerini logla
        return this.tasksService.getAll();
      }

    @Get(':id')
    show(@Param('id') id: string) {
        return this.tasksService.show(id);
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(createTaskDto)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.tasksService.update(id, updateTaskDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.tasksService.delete(id);
    }
}
