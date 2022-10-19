import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
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
    const user = await this.userService.findById(createProjectDto.userId);

    if (!user) {
      const errors = { user: 'user not found' };
      throw new HttpException({ errors }, 401);
    }

    return this.projectService.create(createProjectDto, user);
  }

  @Get(':id')
  async findAll(@Param('id') id: number): Promise<Project[] | undefined> {
    // replace by req.user after the auth setup

    return await this.projectService.findAllByUser(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }
}
