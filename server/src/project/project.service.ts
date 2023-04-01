import { BadRequestException, Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { forwardRef } from '@nestjs/common/utils';
import { TaskRepository } from 'src/task/task.repository';
import { User } from 'src/user/entities/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(forwardRef(() => TaskRepository))
    private readonly taskRepository: TaskRepository,
    private readonly projectRepository: ProjectRepository,
  ) {}

  async create(createProjectDto: CreateProjectDto, user: User) {
    const { name, description, handledObject } = createProjectDto;

    const project = new Project();
    project.name = name;
    project.description = description;
    project.user = user;
    project.handledObject = handledObject;

    return this.save(project);
  }

  async save(project: Project) {
    return this.projectRepository.save(project);
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const toUpdate = await this.projectRepository.findById(id);

    const updated = Object.assign(toUpdate, updateProjectDto);

    return await this.save(updated);
  }

  async findById(id: number): Promise<Project | undefined> {
    return this.projectRepository.findById(id);
  }

  async findAllByUser(
    id: number,
    handledObject: number,
  ): Promise<Project[] | undefined> {
    return await this.projectRepository.findAllByUser(id, handledObject);
  }

  async findArchivedProjectByUser(id: number): Promise<Project[] | undefined> {
    return await this.projectRepository.findArchivedProjectByUser(id);
  }

  async delete(id: number) {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      const errors = { project: 'project not found' };
      throw new BadRequestException({ errors });
    }

    return await this.projectRepository.remove(project);
  }

  async deleteTask(id: number, completed: boolean) {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      const errors = { project: 'project not found' };
      throw new BadRequestException({ errors });
    }

    await this.taskRepository.removeTasks(project, completed);
  }
}
