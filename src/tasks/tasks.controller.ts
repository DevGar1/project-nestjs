import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put, Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskMapping } from './task.mapping';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidatorPipes } from './pipes/task-status-validatior.pipes';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.Dto';


@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {
  }

  @Get('filter')
  getAllFilter(@Query(ValidationPipe) taskDto: GetTaskFilterDto): Promise<TaskMapping[]> {
    console.log(taskDto);
    return this.taskService.getTaskFilter(taskDto);
  }

  @Get('all/')
  getAllTasks(): Promise<TaskMapping[]> {
    return this.taskService.getAllTask();
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<TaskMapping> {
    return this.taskService.getTaskById(id);
  }


  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskMapping> {
    return await this.taskService.createTask(createTaskDto);
  }

  @Delete('/delete/:id')
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.taskService.deleteTask(id);
  }

  @Put('update/status/:id')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidatorPipes) status: TaskStatus,
  ): Promise<TaskMapping> {
    return await this.taskService.updateStatus(id, status);
  }


}
