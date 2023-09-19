import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Project } from '../project/entities/project.entity';
import { ProjectService } from '../project/project.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

const task = {
  id: 1,
  title: 'first task',
  isDone: false,
  description: 'task description',
  project: null,
  isDeleted: false,
};

const project = {
  id: 1,
  name: 'project test',
  description: 'DSA resources',
  isArchive: false,
  user: null,
  tasks: null,
};

const tasks = [task];

describe('TaskController', () => {
  let controller: TaskController;

  const mockTaskService = {
    create: (createTaskDto: CreateTaskDto, project: Project) => task,
    findAllByProject: (project: Project) => tasks,
    findOne: (id: number) => task,
    remove: (id: number) => task,
    update: (id: number, updateTaskDto: UpdateTaskDto) => task,
  };

  const mockProjectService = {
    findById: (id: number) => project,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: ProjectService, useValue: mockProjectService },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('TaskController.__create', () => {
    it('should thrown a HttpException error', async () => {
      //arrange
      const createTaskDto = {
        title: 'first task',
        description: 'first task description',
        projectId: 2,
        parentId: null,
      };
      jest.spyOn(mockProjectService, 'findById').mockReturnValue(null);

      try {
        await controller.create(createTaskDto);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
      }
    });

    it('should create, save and return a brand new task', async () => {
      //arrange
      const createTaskDto = {
        title: 'first task',
        description: 'first task description',
        projectId: 2,
        parentId: null,
      };
      jest.spyOn(mockProjectService, 'findById').mockReturnValue(project);
      jest.spyOn(mockTaskService, 'create').mockReturnValue(task);

      //act
      const result = await controller.create(createTaskDto);

      //assert
      expect(result).toEqual(task);
      expect(mockTaskService.create).toBeCalledWith(createTaskDto, project);
    });
  });

  describe('TaskController.__findAllByProject', () => {
    it('should throw an HttpException error', async () => {
      //arrange
      const id = '1';
      jest.spyOn(mockProjectService, 'findById').mockReturnValue(null);

      try {
        await controller.findAllByProject(id);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(mockProjectService.findById).toBeCalledWith(+id);
      }
    });

    it('should find and return a array tasks for a given project', async () => {
      //arrange
      const id = '1';
      jest.spyOn(mockProjectService, 'findById').mockReturnValue(project);
      jest.spyOn(mockTaskService, 'findAllByProject').mockReturnValue(tasks);

      //act
      const result = await controller.findAllByProject(id);

      //assert
      expect(result).toEqual(tasks);
      expect(mockProjectService.findById).toBeCalledWith(+id);
      expect(mockTaskService.findAllByProject).toBeCalledWith(project);
    });
  });

  describe('TaskController.__findOne', () => {
    it('should find and return a task', async () => {
      //arrange
      const id = '1';
      jest.spyOn(mockTaskService, 'findOne').mockReturnValue(task);

      //act
      const result = await controller.findOne(id);

      //assert
      expect(result).toEqual(task);
      expect(mockTaskService.findOne).toBeCalledWith(+id);
      expect(mockTaskService.findOne).toBeCalledTimes(1);
    });
  });

  describe('TaskController.__update', () => {
    it('shoul update and return a given task', async () => {
      //arrange
      const id = '1';
      const updateTaskDto = {
        title: 'first task',
        description: 'first task description',
        projectId: 2,
      };
      jest.spyOn(mockTaskService, 'update').mockReturnValue(task);

      //act
      const result = await controller.update(id, updateTaskDto);

      //assert
      expect(result).toEqual(task);
      expect(mockTaskService.update).toBeCalledWith(+id, updateTaskDto);
      expect(mockTaskService.update).toBeCalledTimes(1);
    });
  });

  describe('TaskController.__remove', () => {
    it('should remove and return a task', async () => {
      //arrange
      const id = '1';
      jest.spyOn(mockTaskService, 'remove').mockReturnValue(task);

      //act
      const result = await controller.remove(id);

      //assert
      expect(result).toEqual(task);
      expect(mockTaskService.remove).toBeCalledWith(+id);
      expect(mockTaskService.remove).toBeCalledTimes(1);
    });
  });
});
