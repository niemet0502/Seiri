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

  async findAllByProject(
    project: Project,
    showCompleted?: boolean,
  ): Promise<Task[]> {
    const projectId = project.id;

    let query = this.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.children', 'child')
      .where('task.parentId IS NULL')
      .andWhere('task.projectId = :projectId', { projectId });

    if (showCompleted === false) {
      query = query.andWhere('task.isDone = :isDone', { isDone: false });
    }

    const tasks = await query.orderBy('task.isDone', 'ASC').getMany();

    return tasks;
  }

  async findById(id: number): Promise<Task | undefined> {
    const task = await this.tasksRepository.findOne({
      where: { id: id, parent: undefined },
      relations: ['project'],
    });

    const children = await this.tasksRepository
      .createQueryBuilder('task')
      .where('task.parentId = :parentId', { parentId: id })
      .orderBy('task.isDone', 'ASC')
      .getMany();

    return { ...task, children };
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

  async findTaskDueAndToday(userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of the day

    const dueTasks = await this.tasksRepository
      .createQueryBuilder('task')
      .where('task.createdBy = :userId', { userId })
      .andWhere('(task.dueDate IS NOT NULL AND task.dueDate <= :today)', {
        today,
      })
      .andWhere('task.completedAt IS NULL')
      .getMany();

    return dueTasks;
  }

  async findCompletedTask(userId: number) {
    return this.tasksRepository.find({
      where: { createdBy: userId, isDone: true },
      order: { completedAt: 'DESC' },
      relations: ['project'],
    });
  }
}
