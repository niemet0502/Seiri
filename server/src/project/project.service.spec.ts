import { Test, TestingModule } from '@nestjs/testing';
import { Task } from '../task/entities/task.entity';
import { TaskRepository } from '../task/task.repository';
import { task, tasks } from '../task/task.repository.spec';
import { Project } from './entities/project.entity';
import { ProjectRepository } from './project.repository';
import { ProjectService } from './project.service';

const project = {
  id: 1,
  name: 'project test',
  description: 'DSA resources',
  isArchive: false,
  user: null,
  tasks: null,
  notes: null,
  handledObject: null,
  isDefault: false,
};

const projects = [project];

describe('ProjectService', () => {
  let projectService: ProjectService;

  const mockRepository = {
    save: (project: Project) => project,
    findAllByUser: (id: number) => projects,
    findById: (id: number) => project,
    delete: (id: number) => true,
  };

  const mockTaskRepository = {
    save: (task: Task) => task,
    find: (project?: Project) => tasks,
    findOne: (id: number) => task,
    remove: (task: Task) => task,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: ProjectRepository,
          useValue: mockRepository,
        },
        {
          provide: TaskRepository,
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    projectService = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(projectService).toBeDefined();
  });

  describe('ProjectService.__save ', () => {
    it('Should save and return a project', async () => {
      const dto = {
        id: 1,
        name: 'project test',
        description: 'DSA resources',
        isArchive: false,
        user: null,
        tasks: null,
        notes: null,
        handledObject: null,
        isDefault: false,
      };

      jest.spyOn(mockRepository, 'save').mockReturnValue(project);

      expect(await projectService.save(dto)).toEqual(project);
      expect(mockRepository.save).toBeCalledWith(dto);
    });
  });

  describe('ProjectService.__findAllByUser', () => {
    it('should return a project array', async () => {
      const userId = 1;
      const handledObject = 1;
      const includeArchived = true;
      jest.spyOn(mockRepository, 'findAllByUser').mockReturnValue(projects);

      expect(
        await projectService.findAllByUser(
          userId,
          handledObject,
          includeArchived,
        ),
      ).toEqual(projects);
      expect(mockRepository.findAllByUser).toBeCalledTimes(1);
      expect(mockRepository.findAllByUser).toBeCalledWith(
        userId,
        handledObject,
        includeArchived,
      );
    });
  });

  describe('ProjectService.__findById', () => {
    it('should find and return a project', async () => {
      const projectId = 1;
      jest.spyOn(mockRepository, 'findById').mockReturnValue(project);

      expect(await projectService.findById(projectId)).toEqual(project);
      expect(mockRepository.findById).toBeCalledTimes(1);
      expect(mockRepository.findById).toBeCalledWith(projectId);
    });
  });

  describe('ProjectService.__update', () => {
    it('Should update and return a project', async () => {
      const projectId = 1;
      const updateProjectDto = {
        name: 'project test',
        description: 'DSA resources',
        isArchive: false,
      };

      jest.spyOn(mockRepository, 'findById').mockReturnValue(project);
      jest.spyOn(mockRepository, 'save').mockReturnValue(project);

      expect(await projectService.update(projectId, updateProjectDto)).toEqual(
        project,
      );
      expect(mockRepository.findById).toBeCalledWith(projectId);
      expect(mockRepository.save).toBeCalled();
    });
  });
});
