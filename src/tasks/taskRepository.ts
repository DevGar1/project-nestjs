import { EntityRepository, Repository } from 'typeorm/index';
import { TaskMapping } from './task.mapping';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.Dto';
import {User} from "../auth/user.mapping";
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(TaskMapping)
export class TaskRepository extends Repository<TaskMapping> {
  private logger = new Logger('TaskRepository');
  async getTaskFilter(filterDto: GetTaskFilterDto,
                      user: User
                      ): Promise<TaskMapping[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    query.andWhere('task.userId = :userId', {userId: user.id});
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
    }
    try {
      return await query.getMany();
    } catch (error) {
      this.logger.error(`failed to get task fr user "${user.username}", DTO: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<TaskMapping> {
    const { description, title } = createTaskDto;
    const task = new TaskMapping();
    task.description = description;
    task.title = title;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();
    return task;
  }

}
