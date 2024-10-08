import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from '../project/entities/project.entity';
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

  const mockRespository = {
    save: (task: Task) => task,
    find: (project?: Project) => tasks,
    findOne: (id: number) => task,
    remove: (task: Task) => task,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskRepository,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRespository,
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
      jest.spyOn(mockRespository, 'save').mockReturnValue(task);

      //act
      const result = await taskRepository.save(task);

      //assert
      expect(result).toEqual(task);
      expect(mockRespository.save).toBeCalledWith(task);
    });
  });

  describe('TaskRepository.__findAll', () => {
    it('should return an array of tasks', async () => {
      //arrange
      jest.spyOn(mockRespository, 'find').mockReturnValue(tasks);

      //act
      const result = await taskRepository.findAll();

      //assert
      expect(result).toEqual(tasks);
      expect(mockRespository.find).toBeCalled();
    });
  });

  describe('TaskRepository.__findById', () => {
    it('should find by id and return a task', async () => {
      //arrange
      const id = 1;
      jest.spyOn(mockRespository, 'findOne').mockReturnValue(task);

      //act
      const result = await taskRepository.findById(id);

      //assert
      expect(result).toEqual(task);
      expect(mockRespository.findOne).toBeCalledWith({
        where: { id: id, parent: undefined },
        relations: ['children', 'project', 'parent'],
      });
      expect(mockRespository.findOne).toBeCalledTimes(1);
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
      jest.spyOn(mockRespository, 'remove').mockReturnValue(task);

      //act
      const result = await taskRepository.remove(task);

      // assert
      expect(result).toEqual(task);
      expect(mockRespository.remove).toBeCalledTimes(1);
      expect(mockRespository.remove).toBeCalledWith(task);
    });
  });
});
