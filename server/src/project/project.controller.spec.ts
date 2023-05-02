import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

const user = {
  id: null,
  isConfirm: false,
  lastname: 'Marius',
  firstname: 'NIEMET',
  email: 'mariusniemet@gmail.com',
  password: '',
  projects: [],
  sessions: null,
  avatar: null,
};

const project = {
  id: 1,
  name: 'project test',
  description: 'DSA resources',
  isArchive: false,
  user: user,
  notes: null,
};

const projects = [project];

describe('ProjectController', () => {
  let projectController: ProjectController;

  const mockProjectService = {
    create: (createProjectDto: CreateProjectDto, user: User) => project,
    findAllByUser: (id: number) => projects,
    findArchivedProjectByUser: (id: number) => projects,
    update: (id: number, dto: UpdateProjectDto) => project,
  };
  const mockUserService = {
    findById: jest.fn((id) => {
      if (id === 1) {
        return {
          id: id,
          ...user,
        };
      }

      return;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [
        {
          provide: ProjectService,
          useValue: mockProjectService,
        },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    projectController = module.get<ProjectController>(ProjectController);
  });

  it('should be defined', () => {
    expect(projectController).toBeDefined();
  });

  describe('ProjectController.__create', () => {
    it('Should throw an HttpException error ', async () => {
      const projectDto = {
        name: 'DSA resources',
        userId: 3,
        handledObject: 1,
      } as CreateProjectDto;

      jest.spyOn(mockUserService, 'findById').mockReturnValue(null);

      try {
        await projectController.create(user, projectDto);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
      }
    });

    it('Should create a brand new project', async () => {
      const projectDto = {
        name: 'DSA resources',
        userId: 1,
        handledObject: 1,
      };

      const userDto = {
        ...user,
        password: '',
        projects: [],
        sessions: null,
      };

      jest.spyOn(mockUserService, 'findById').mockReturnValue(user);
      jest.spyOn(mockProjectService, 'create').mockReturnValue(project);

      expect(await projectController.create(userDto, projectDto)).toEqual(
        project,
      );
      expect(mockProjectService.create).toBeCalledTimes(1);
    });
  });

  describe('ProjectController.__findAll', () => {
    it('Should return a array project', async () => {
      const handledObject = 1;
      const userDto = {
        ...user,
        id: 1,
        password: '',
        projects: [],
        sessions: null,
      };
      jest.spyOn(mockProjectService, 'findAllByUser').mockReturnValue(projects);

      expect(await projectController.findAll(handledObject, userDto)).toEqual(
        projects,
      );
      expect(mockProjectService.findAllByUser).toBeCalledWith(
        +userDto.id,
        handledObject,
      );
      expect(mockProjectService.findAllByUser).toBeCalledTimes(1);
    });
  });

  describe('ProjectController.__findAll', () => {
    it('Should return a array project', async () => {
      const userId = 1;
      jest
        .spyOn(mockProjectService, 'findArchivedProjectByUser')
        .mockReturnValue(projects);

      expect(await projectController.findAllArchived(userId)).toEqual(projects);
      expect(mockProjectService.findArchivedProjectByUser).toBeCalledWith(
        userId,
      );
      expect(mockProjectService.findArchivedProjectByUser).toBeCalledTimes(1);
    });
  });

  describe('ProjectController.__update', () => {
    it('Should update and return a given project', async () => {
      const projectId = '1';
      const projectDto = {
        name: 'DSA resources',
        userId: 1,
      };

      jest.spyOn(mockProjectService, 'update').mockReturnValue(project);

      expect(await projectController.update(projectId, projectDto)).toEqual(
        project,
      );
      expect(mockProjectService.update).toBeCalledWith(+projectId, projectDto);
      expect(mockProjectService.update).toBeCalledTimes(1);
    });
  });
});
