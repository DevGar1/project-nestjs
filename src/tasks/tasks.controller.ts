import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskMapping } from './task.mapping';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.Dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.mapping';
import { GetUser } from '../auth/get-user.decorator';
import { TaskStatusValidatorPipes } from './pipes/task-status-validatior.pipes';
import { TaskStatus } from './task-status.enum';


@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');

  constructor(private taskService: TasksService) {
  }

  @Get('filter')
  getAllFilter(@Query(ValidationPipe) taskDto: GetTaskFilterDto,
               @GetUser() user: User,
  ): Promise<TaskMapping[]> {
    this.logger.verbose(`User "${user.username}" retrieving a task ${JSON.stringify(taskDto)}`);
    return this.taskService.getTaskFilter(taskDto, user);
  }

  @Get('all/')
  getAllTasks(): Promise<TaskMapping[]> {
    return this.taskService.getAllTask();
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number,
              @GetUser()  user: User): Promise<TaskMapping> {
    return this.taskService.getTaskById(id, user);
  }


  @Post()
  @UsePipes(ValidationPipe)
  async createTask(
      @Body() createTaskDto: CreateTaskDto,
      @GetUser() user: User
  ): Promise<TaskMapping> {
    this.logger.verbose(`User "${user.username}" creating a new task. DATA: ${JSON.stringify(createTaskDto)}`);
    return await this.taskService.createTask(createTaskDto, user);
  }

  @Delete('/delete/:id')
  async deleteTask(@Param('id', ParseIntPipe) id: number,
                   @GetUser() user: User): Promise<void> {
    await this.taskService.deleteTask(id, user);
  }
  @Put('update/status/:id')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidatorPipes) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<TaskMapping> {
    return await this.taskService.updateStatus(id, status, user);
  }


}
