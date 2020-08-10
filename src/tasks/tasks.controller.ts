import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskModel, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.Dto';
import { TaskStatusValidatorPipes } from './pipes/task-status-validatior.pipes';


@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {
  }

  @Get()
  getAllTasks(@Query() filterDto: GetTaskFilterDto): TaskModel[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTaskWithFilters(filterDto);
    }
    return this.taskService.getAllTask();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): TaskModel {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto): TaskModel {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): TaskModel {
    return this.taskService.deleteTask(id);
  }

  @Put('/:id/status')
  updateStatus(@Param('id') id: string,
               @Body('status', TaskStatusValidatorPipes) status: TaskStatus): TaskModel {
    return this.taskService.updateTask(id, status);
  }
}
