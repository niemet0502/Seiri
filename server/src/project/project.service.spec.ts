import { Test, TestingModule } from '@nestjs/testing';
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: ProjectRepository,
          useValue: mockRepository,
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
      };

      jest.spyOn(mockRepository, 'save').mockReturnValue(project);

      expect(await projectService.save(dto)).toEqual(project);
      expect(mockRepository.save).toBeCalledWith(dto);
    });
  });

  describe('ProjectService.__findAllByUser', () => {
    it('should return a project array', async () => {
      const userId = 1;
      jest.spyOn(mockRepository, 'findAllByUser').mockReturnValue(projects);

      expect(await projectService.findAllByUser(userId)).toEqual(projects);
      expect(mockRepository.findAllByUser).toBeCalledTimes(1);
      expect(mockRepository.findAllByUser).toBeCalledWith(userId);
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
