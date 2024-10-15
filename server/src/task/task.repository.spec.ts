import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskRepository } from './task.repository';

export const task = {
  id: 1,
  title: 'first task',
  isDone: false,
  description: 'task description',
  project: null,
  isDeleted: false,
};

export const tasks = [task];

describe('TaskRepository', () => {
  let taskRepository: TaskRepository;

  const mockRepository = {
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      execute: jest.fn(),
      getOne: jest.fn(),
    })),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskRepository,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepository,
        },
      ],
    }).compile();

    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  describe('TaskRepository.__save', () => {
    it('should save and return an task', async () => {
      // arrange
      const task = {
        id: 1,
        title: 'first task',
        isDone: false,
        description: 'task description',
        project: null,
        isDeleted: false,
        parent: null,
        children: [],
        dueDate: null,
        completedAt: null,
        createdBy: null,
      };
      jest.spyOn(mockRepository, 'save').mockReturnValue(task);

      //act
      const result = await taskRepository.save(task);

      //assert
      expect(result).toEqual(task);
      expect(mockRepository.save).toBeCalledWith(task);
    });
  });

  describe('TaskRepository.__findAll', () => {
    it('should return an array of tasks', async () => {
      //arrange
      jest.spyOn(mockRepository, 'find').mockReturnValue(tasks);

      //act
      const result = await taskRepository.findAll();

      //assert
      expect(result).toEqual(tasks);
      expect(mockRepository.find).toBeCalled();
    });
  });

  describe('TaskRepository.__findById', () => {
    it('should find by id and return a task', async () => {
      //arrange
      const id = 1;
      jest.spyOn(mockRepository, 'findOne').mockReturnValue(task);

      //act
      const result = await taskRepository.findById(id);

      //assert
      expect(result).toEqual(task);
      expect(mockRepository.findOne).toBeCalledWith({
        where: { id: id, parent: undefined },
        relations: ['children', 'project', 'parent'],
      });
      expect(mockRepository.findOne).toBeCalledTimes(1);
    });
  });

  describe('TaskRepository.__remove', () => {
    it('shoud remove a given task and return it', async () => {
      //arrange
      const task = {
        id: 1,
        title: 'first task',
        isDone: false,
        description: 'task description',
        project: null,
        isDeleted: false,
        parent: null,
        children: [],
        dueDate: null,
        completedAt: null,
        createdBy: null,
      };

      const expectedResult = { ...task, isDeleted: true };
      jest.spyOn(mockRepository, 'save').mockReturnValue(expectedResult);

      //act
      const result = await taskRepository.remove(task);

      // assert
      expect(result).toEqual(expectedResult);
      expect(mockRepository.save).toBeCalledWith(expectedResult);
    });
  });
});
