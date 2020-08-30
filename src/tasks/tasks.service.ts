import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './taskRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskMapping } from './task.mapping';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.Dto';
import { User } from '../auth/user.mapping';
import { TaskStatus } from './task-status.enum';


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {
  }

  async getTaskFilter(filterDto: GetTaskFilterDto,
                      user: User,
  ): Promise<TaskMapping[]> {
    return this.taskRepository.getTaskFilter(filterDto, user);
  }

  async getTaskById(id: number,
                    user: User,
  ): Promise<TaskMapping> {
    const found = await this.taskRepository.findOne({ where: { id, userId: user.id } });
    if (!found) {
      throw new NotFoundException(`El elemento con id: "${id}" no fue encontrado`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<TaskMapping> {
    return await this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const found = await this.getTaskById(id, user);
    await found.remove();
  }

  async getAllTask(): Promise<TaskMapping[]> {
    const found = await this.taskRepository.find();
    if (found.length <= 0) {
      throw new NotFoundException(`No tenemos registros`);
    }
    return found;
  }

  async updateStatus(id: number, status: TaskStatus, user: User) {
    const found = await this.getTaskById(id, user);
    found.status = status;
    await found.save();
    return found;

  }


}
