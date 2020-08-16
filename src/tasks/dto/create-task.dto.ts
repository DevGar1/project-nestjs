import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  constructor(description: string, title: string) {
    this.description = description;
    this.title = title;
  }

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
