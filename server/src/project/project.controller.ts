import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjectValidatorPipe } from './dto/validation.pipe';
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
}
