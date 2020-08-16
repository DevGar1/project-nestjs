import { TaskStatus } from '../task-status.enum';
import { IsIn, IsOptional } from 'class-validator';

export class GetTaskFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN,TaskStatus.DONE, TaskStatus.IN_PROGRESS])
  status: TaskStatus;

  @IsOptional()
  search: string;
}
