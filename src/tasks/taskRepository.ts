import { EntityRepository, Repository } from 'typeorm/index';
import { TaskMapping } from './task.mapping';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.Dto';

@EntityRepository(TaskMapping)
export class TaskRepository extends Repository<TaskMapping> {

  async getTaskFilter(filterDto: GetTaskFilterDto): Promise<TaskMapping[]> {
    const { status, search } = filterDto;
    console.log(search);
    const query = this.createQueryBuilder('task');
    if (status) {
      console.log(status);
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      console.log(search);
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
    }
    return await query.getMany();
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskMapping> {
    const { description, title } = createTaskDto;
    const task = new TaskMapping();
    task.description = description;
    task.title = title;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }

}
