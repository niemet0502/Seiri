import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectRepository } from './project.repository';

const project = {
  id: 1,
  name: 'project test',
  description: 'DSA resources',
  isArchive: false,
  user: null,
  tasks: null,
  notes: null,
};

const projects = [project];

describe('ProjectRepository', () => {
  let projectsRepository: ProjectRepository;

  const mockRepository = {
    findOne: (dto: any) => project,
    save: (project: any) => project,
    find: (id: number) => projects,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectRepository,
        {
          provide: getRepositoryToken(Project),
          useValue: mockRepository,
        },
      ],
    }).compile();
    projectsRepository = module.get<ProjectRepository>(ProjectRepository);
  });

  describe('ProjectRepository.__findById', () => {
    it('Should find and return a project', async () => {
      const id = 1;

      jest.spyOn(mockRepository, 'findOne').mockReturnValue(project);

      const result = await projectsRepository.findById(id);

      expect(result).toEqual(project);
      expect(result.id).toEqual(id);
      expect(mockRepository.findOne).toBeCalledWith({ where: { id: id } });
      expect(mockRepository.findOne).toBeCalledTimes(1);
    });
  });

  describe('ProjectRepository.__save', () => {
    it('Should save and return a project', async () => {
      const project = {
        id: 1,
        name: 'project test',
        description: 'DSA resources',
        isArchive: false,
        user: null,
        tasks: null,
        notes: null,
        handledObject: 2,
      };

      jest.spyOn(mockRepository, 'save').mockReturnValue(project);

      expect(await projectsRepository.save(project)).toEqual(project);
      expect(mockRepository.save).toBeCalledTimes(1);
    });
  });

  describe('ProjectRepository.__findAllByUser', () => {
    it('should return an array of project of a given user', async () => {
      const id = 1;
      const handledObject = 1;

      jest.spyOn(mockRepository, 'find').mockReturnValue(projects);

      expect(await projectsRepository.findAllByUser(id, handledObject)).toEqual(
        projects,
      );
      expect(mockRepository.find).toBeCalledWith({
        order: { id: 'DESC' },
        where: {
          user: { id: id },
          isArchive: false,
          handledObject: handledObject,
        },
      });
    });
  });

  describe('ProjectRepository.__findAllByUser', () => {
    it('should return an array of archived project of a given user', async () => {
      const id = 1;

      jest.spyOn(mockRepository, 'find').mockReturnValue(projects);

      expect(await projectsRepository.findArchivedProjectByUser(id)).toEqual(
        projects,
      );
      expect(mockRepository.find).toBeCalledWith({
        order: { id: 'DESC' },
        where: { user: { id: id }, isArchive: true },
      });
    });
  });
});
