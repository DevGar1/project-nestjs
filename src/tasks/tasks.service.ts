import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskModel, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.Dto';

@Injectable()
export class TasksService {
  private tasks: TaskModel[] = [];

  getAllTask(): TaskModel[] {
    return this.tasks;
  }

  getTaskWithFilters(filterDto: GetTaskFilterDto): TaskModel[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTask();

    if (status) {
      tasks = tasks.filter(tasks => tasks.status === status);
    }

    if (search) {
      tasks = tasks.filter(tasks =>
        tasks.title.includes(search) ||
        tasks.description.includes(search),
      );
    }
    return tasks;
  }


  createTask(createTaskDto: CreateTaskDto): TaskModel {
    const { title, description } = createTaskDto;
    const task: TaskModel = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  y;

  getTaskById(id: string): TaskModel {
    return this.tasks.find(task => task.id === id);
  }


  deleteTask(id: string): TaskModel {
    const eliminated = this.getTaskById(id);
    if (eliminated) {
      const place = this.tasks.indexOf(eliminated);
      this.tasks.splice(place, 1);
      return eliminated;
    } else {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
  }

  updateTask(id: string, status: TaskStatus): TaskModel {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
