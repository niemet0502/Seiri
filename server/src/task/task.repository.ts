import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../project/entities/project.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async save(task: Task) {
    return await this.tasksRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  async findAllByProject(project: Project): Promise<Task[]> {
    const projectId = project.id;

    const tasks = await this.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.children', 'child')
      .where('task.parentId IS NULL')
      .andWhere('task.projectId = :projectId', { projectId })
      .getMany();

    return tasks;
  }

  async findById(id: number): Promise<Task | undefined> {
    return await this.tasksRepository.findOne({
      where: { id: id, parent: undefined },
      relations: ['children', 'project'],
    });
  }

  async remove(task: Task) {
    return await this.tasksRepository.remove(task);
  }

  async removeTasks(project: Project, isDone: boolean) {
    return await this.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.children', 'child')
      .where('task.projectId = :projectId', { projectId: project.id })
      .andWhere('task.parentId IS NULL')
      .andWhere('task.isDone = true')
      .delete()
      .execute();
  }
}
