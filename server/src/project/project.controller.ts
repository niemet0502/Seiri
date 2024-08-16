import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { UserDecorator } from '../user/user.decorator';
import { UserService } from '../user/user.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectValidatorPipe } from './dto/validation.pipe';
import { Project } from './entities/project.entity';
import { ProjectService } from './project.service';

@Controller('projects')
@ApiTags('Projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(
    @UserDecorator() user: User,
    @Body(new CreateProjectValidatorPipe()) createProjectDto: CreateProjectDto,
  ) {
    if (!user) {
      const errors = { user: 'user not found' };
      return new HttpException({ errors }, 401);
    }

    return this.projectService.create(createProjectDto, user);
  }

  @Get()
  async findAll(
    @Query('handledObject') handledObject: number,
    @Query('includeArchived') includeArchived: string,
    @UserDecorator() user: User,
  ): Promise<Project[] | undefined> {
    console.log(includeArchived);
    
    return await this.projectService.findAllByUser(
      +user.id,
      handledObject,
      includeArchived === 'true',
    );
  }

  // @Get('/archived/:id')
  // async findAllArchived(
  //   @Param('id') id: number,
  // ): Promise<Project[] | undefined> {
  //   // replace by req.user after the auth setup

  //   return await this.projectService.findArchivedProjectByUser(+id);
  // }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project | undefined> {
    return await this.projectService.findById(+id);
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

  @Delete(':id/tasks')
  async deleteTasks(
    @Param('id') id: string,
    @Query('completed') completed: boolean,
  ) {
    return await this.projectService.deleteTask(+id, completed);
  }
}
