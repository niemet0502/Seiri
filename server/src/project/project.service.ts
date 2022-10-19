import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async create(createProjectDto: CreateProjectDto, user: User) {
    const { name, description } = createProjectDto;

    const project = new Project();
    project.name = name;
    project.description = description;
    project.user = user;

    return this.save(project);
  }

  async save(project: Project) {
    return this.projectRepository.save(project);
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const toUpdate = await this.findById(id);

    const updated = Object.assign(toUpdate, updateProjectDto);

    return await this.save(updated);
  }

  async findById(id: number): Promise<Project | undefined> {
    return this.projectRepository.findById(id);
  }

  async findAllByUser(id: number): Promise<Project[] | undefined> {
    return await this.projectRepository.findAllByUser(id);
  }
}
