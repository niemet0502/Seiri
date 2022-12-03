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
    return await this.tasksRepository.find({
      where: { project: project, isDone: false },
    });
  }

  async findById(id: number): Promise<Task | undefined> {
    return await this.tasksRepository.findOne({ where: { id: id } });
  }

  async remove(task: Task) {
    return await this.tasksRepository.remove(task);
  }
}
