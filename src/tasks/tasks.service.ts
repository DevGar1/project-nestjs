import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './taskRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskMapping } from './task.mapping';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.Dto';


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {
  }

  async getTaskFilter(filterDto: GetTaskFilterDto): Promise<TaskMapping[]> {
    return this.taskRepository.getTaskFilter(filterDto);
  }

  async getTaskById(id: number): Promise<TaskMapping> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`El elemento con id: "${id}" no fue encontrado`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskMapping> {
    return await this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: number): Promise<void> {
    const found = await this.getTaskById(id);
    found.remove();
  }

  async getAllTask(): Promise<TaskMapping[]> {
    const found = await this.taskRepository.find();
    if (found.length <= 0) {
      throw new NotFoundException(`No tenemos registros`);
    }
    return found;
  }

  async updateStatus(id: number, status: TaskStatus) {
    const found = await this.getTaskById(id);
    found.status = status;
    await found.save();
    return found;

  }


}
