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
import { UserService } from '../user/user.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectValidatorPipe } from './dto/validation.pipe';
import { Project } from './entities/project.entity';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(
    @Body(new CreateProjectValidatorPipe()) createProjectDto: CreateProjectDto,
  ) {
    const user = await this.userService.findById(createProjectDto.userId); // replace by req.user

    if (!user) {
      const errors = { user: 'user not found' };
      return new HttpException({ errors }, 401);
    }

    return this.projectService.create(createProjectDto, user);
  }

  @Get(':id')
  async findAll(@Param('id') id: number): Promise<Project[] | undefined> {
    // replace by req.user after the auth setup

    return await this.projectService.findAllByUser(+id);
  }

  @Get('/archived/:id')
  async findAllArchived(
    @Param('id') id: number,
  ): Promise<Project[] | undefined> {
    // replace by req.user after the auth setup

    return await this.projectService.findArchivedProjectByUser(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.projectService.delete(+id);
  }
}
