import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectService } from '../project/project.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskValidatorPipe } from './dto/validattion.pipe.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly projectService: ProjectService,
  ) {}

  @Post()
  async create(
    @Body(new CreateTaskValidatorPipe()) createTaskDto: CreateTaskDto,
  ) {
    const project = await this.projectService.findById(
      +createTaskDto.projectId,
    );

    if (!project) {
      const errors = { project: 'project not found' };
      return new HttpException({ errors }, 401);
    }

    return this.taskService.create(createTaskDto, project);
  }

  @Get(':id')
  async findAllByProject(@Param('id') id: string) {
    const project = await this.projectService.findById(+id);

    if (!project) {
      const errors = { project: 'user not found' };
      return new HttpException({ errors }, 401);
    }

    return this.taskService.findAllByProject(project);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
