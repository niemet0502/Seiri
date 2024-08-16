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
    includeArchived: boolean,
  ): Promise<Project[] | undefined> {
    const queryBuilder = this.projectsRepository.createQueryBuilder('project');

    // Add base conditions
    queryBuilder
      .where('project.userId = :userId', { userId: id })
      .andWhere('project.handledObject = :handledObject', { handledObject });

    // Conditionally add the isArchived filter
    if (!includeArchived) {
      queryBuilder.andWhere('project.isArchive = :isArchive', {
        isArchive: false,
      });
    }

    // Order results
    queryBuilder.orderBy('project.id', 'DESC');

    return await queryBuilder.getMany();
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
