import { BaseEntity, Entity } from 'typeorm';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm/index';
import { TaskStatus } from './task-status.enum';
import { IsInt } from 'class-validator';
import { User } from '../auth/user.mapping';


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


  @ManyToOne(() => User, user => user.task, {
    eager: false,
  })
  user: User;

  @Column()
  userId: number;
}

