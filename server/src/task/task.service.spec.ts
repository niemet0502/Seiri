import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Project } from '../project/entities/project.entity';
import { Task } from './entities/task.entity';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

const task = {
  id: 1,
  title: 'first task',
  isDone: false,
  description: 'task description',
  project: null,
  isDeleted: false,
};

const tasks = [task];

describe('TaskService', () => {
  let service: TaskService;

  const mockRepository = {
    save: (task: Task) => task,
    findAllByProject: (project: Project) => tasks,
    findById: (id: number) => task,
    remove: (task: Task) => task,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: TaskRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('TaskService.__create', () => {});

  describe('TaskService.__findAllByProject', () => {
    it('should find tasks by project and return them', async () => {
      //arrange
      const project = {
        id: 1,
        name: 'project test',
        description: 'DSA resources',
        isArchive: false,
        user: null,
        tasks: null,
        notes: null,
        handledObject: 1,
      };
      jest.spyOn(mockRepository, 'findAllByProject').mockReturnValue(tasks);

      //act
      const result = await service.findAllByProject(project);

      //assert
      expect(result).toEqual(tasks);
      expect(mockRepository.findAllByProject).toBeCalledTimes(1);
      expect(mockRepository.findAllByProject).toBeCalledWith(project);
    });
  });
  describe('TaskService.__findOne', () => {
    it('should find by id a task and return it', async () => {
      //arrange
      const id = 1;
      jest.spyOn(mockRepository, 'findById').mockReturnValue(task);

      //act
      const result = await service.findOne(id);

      //assert
      expect(result).toEqual(task);
      expect(mockRepository.findById).toBeCalledWith(id);
    });
  });

  describe('TaskService.__remove', () => {
    it('should throw an BadRequestException error ', async () => {
      //arrange
      const id = 1;
      jest.spyOn(mockRepository, 'findById').mockReturnValue(null);

      try {
        const result = await service.remove(1);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });

    it('should remove a given task and return it ', async () => {
      //arrange
      const id = 1;
      const task = {
        id: 1,
        title: 'first task',
        isDone: false,
        description: 'task description',
        project: null,
        isDeleted: false,
        parent: null,
        children: null,
      };
      jest.spyOn(mockRepository, 'findById').mockReturnValue(task);
      jest.spyOn(mockRepository, 'remove').mockReturnValue(task);

      // act
      const result = await service.remove(id);

      // assert
      expect(result).toEqual(task);
      expect(mockRepository.remove).toBeCalledWith(task);
    });
  });
});
