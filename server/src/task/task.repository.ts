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
    return await this.tasksRepository.find({ where: { isDeleted: false } });
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
      .andWhere('task.isDeleted = :isDeleted', { isDeleted: false })
      .andWhere('task.projectId = :projectId', { projectId });

    if (showCompleted === false) {
      query = query.andWhere('task.isDone = :isDone', { isDone: false });
    }

    const tasks = await query.orderBy('task.isDone', 'ASC').getMany();

    return tasks;
  }

  async findById(id: number): Promise<Task | undefined> {
    const task = await this.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect(
        'task.children',
        'child',
        'child.isDeleted = :isDeleted',
        { isDeleted: false },
      )
      .leftJoinAndSelect('task.project', 'project')
      .leftJoinAndSelect('task.parent', 'parent')
      .where('task.id = :id', { id })
      .andWhere('task.isDeleted = :isDeleted', { isDeleted: false })
      .getOne();

    if (task && task.children && task.children.length > 0) {
      task.children.sort((a, b) =>
        a.isDone === b.isDone ? 0 : a.isDone ? 1 : -1,
      );
    }

    return task;
  }

  async remove(task: Task) {
    return await this.tasksRepository.save({ ...task, isDeleted: true });
  }

  async removeTasks(project: Project, isDone: boolean) {
    return await this.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.children', 'child')
      .where('task.projectId = :projectId', { projectId: project.id })
      .andWhere('task.parentId IS NULL')
      .andWhere('task.isDone = true')
      .update()
      .set({ isDeleted: true })
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
      .andWhere('task.isDeleted = :isDeleted', { isDeleted: false })
      .andWhere('task.completedAt IS NULL')
      .getMany();

    return dueTasks;
  }

  async findCompletedTask(userId: number) {
    return this.tasksRepository.find({
      where: { createdBy: userId, isDone: true, isDeleted: false },
      order: { completedAt: 'DESC' },
      relations: ['project'],
    });
  }
}
