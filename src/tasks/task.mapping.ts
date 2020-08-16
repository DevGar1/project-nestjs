import { BaseEntity, Entity } from 'typeorm';
import { Column, PrimaryGeneratedColumn } from 'typeorm/index';
import { TaskStatus } from './task-status.enum';
import { IsInt } from 'class-validator';


@Entity('task')
export class TaskMapping extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}

