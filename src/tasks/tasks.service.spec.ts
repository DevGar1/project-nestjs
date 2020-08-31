import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './taskRepository';
import { GetTaskFilterDto } from './dto/get-task-filter.Dto';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockUser = { id: 12, username: 'user tesxt' };

const mockTaskRepository = () => ({
  getTaskFilter: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
});

describe('TaskService', () => {
  let taskService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],

    }).compile();
    taskService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTask', () => {
    it('gets all task from the repository', async () => {
      taskRepository.getTaskFilter.mockResolvedValue('someValue');

      expect(taskRepository.getTaskFilter).not.toHaveBeenCalled();
      const filters: GetTaskFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'Pruebas unitarioas' };
      const result = await taskService.getTaskFilter(filters, mockUser);
      expect(taskRepository.getTaskFilter).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('getTaskById and return  task', async () => {
      const mockTask = { title: 'title', description: 'description' };
      taskRepository.findOne.mockResolvedValue(mockTask);

      const result = await taskService.getTaskById(1, mockUser);
      expect(result).toEqual(mockTask);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: mockUser.id,
        },
      });
    });
    it('esto pasa cuando se cae en una excepción', () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(taskService.getTaskById(1, mockUser)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create a task', () => {
    it('create', async () => {
      const mockTask = { title: 'title', description: 'description' };
      taskRepository.createTask.mockResolvedValue(mockTask);
      expect(taskRepository.createTask).not.toHaveBeenCalled();
      const result = await taskService.createTask(mockTask, mockUser);
      expect(taskRepository.createTask).toHaveBeenCalled();
      expect(result).toEqual(mockTask);
      expect(taskRepository.createTask).toHaveBeenCalledWith(mockTask, mockUser);
    });
    it('esto pasa cuando se cae en una excepción', () => {
      taskRepository.createTask.mockResolvedValue();
      expect(taskService.getTaskById(1, mockUser)).rejects.toThrow(NotFoundException);
    });
  });
  describe('Actualizar una tarea', () => {
    it('update task status', async () => {
      const save = jest.fn().mockResolvedValue(true);
      taskService.getTaskById = jest.fn().mockResolvedValue({
        status: TaskStatus.OPEN,
        save,
      });
      expect(taskService.getTaskById).not.toHaveBeenCalled();
      const result = await taskService.updateStatus(1, TaskStatus.DONE, mockUser);
      expect(taskService.getTaskById).toHaveBeenCalled();
      expect(save).toHaveBeenCalled();
      expect(result.status).toEqual(TaskStatus.DONE);
    });
  });


});
