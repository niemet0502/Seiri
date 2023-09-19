import { BadRequestException, Injectable } from '@nestjs/common';
import { Project } from '../project/entities/project.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}
  async create(createTaskDto: CreateTaskDto, project: Project) {
    const { title, description, parentId } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.isDeleted = false;

    task.project = project;

    if (parentId) {
      const parentTask = await this.taskRepository.findById(+parentId);
      task.parent = parentTask;
    }

    return this.taskRepository.save(task);
  }

  async findAllByProject(project: Project) {
    return await this.taskRepository.findAllByProject(project);
  }

  async findOne(id: number) {
    return await this.taskRepository.findById(id);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const toUpdate = await this.taskRepository.findById(id);

    const updated = Object.assign(toUpdate, updateTaskDto);

    return await this.taskRepository.save(updated);
  }

  async remove(id: number) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      const errors = { task: 'task not found' };
      throw new BadRequestException({ errors });
    }

    return await this.taskRepository.remove(task);
  }
}
