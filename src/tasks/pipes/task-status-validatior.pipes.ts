import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidatorPipes implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.DONE,
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
  ];

  transform(value: any): any {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatus.indexOf(status);
    return idx   !== -1;
  }



}
