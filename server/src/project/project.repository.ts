import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async save(project: Project) {
    return await this.projectsRepository.save(project);
  }
  async findById(id: number): Promise<Project | undefined> {
    return await this.projectsRepository.findOne({
      where: { id: id },
    });
  }

  async findAllByUser(
    id: number,
    handledObject: number,
  ): Promise<Project[] | undefined> {
    return await this.projectsRepository.find({
      order: { id: 'DESC' },
      where: {
        user: { id: id },
        isArchive: false,
        handledObject: handledObject,
      },
    });
  }

  async findArchivedProjectByUser(id: number): Promise<Project[] | undefined> {
    return await this.projectsRepository.find({
      order: { id: 'DESC' },
      where: { user: { id: id }, isArchive: true },
    });
  }

  async remove(project: Project) {
    return await this.projectsRepository.remove(project);
  }
}
