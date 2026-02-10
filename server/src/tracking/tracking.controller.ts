import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectService } from '../project/project.service';
import { User } from '../user/entities/user.entity';
import { UserDecorator } from '../user/user.decorator';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { TrackingService } from './tracking.service';

@Controller('tracking')
@ApiTags('Tracking')
export class TrackingController {
  constructor(
    private readonly trackingService: TrackingService,
    private readonly projectService: ProjectService,
  ) {}

  @Post()
  async create(
    @UserDecorator() user: User,
    @Body() createTrackingDto: CreateTrackingDto,
  ) {
    return this.trackingService.create(createTrackingDto, user);
  }

  @Get()
  async findAll(@UserDecorator() user: User) {
    return this.trackingService.findAll(user);
  }

  @Get('/project/:id')
  async findAllByProject(@Param('id') id: number) {
    const project = await this.projectService.findById(+id);

    if (!project) {
      const errors = { project: 'project not found' };
      return new HttpException({ errors }, 401);
    }

    return await this.trackingService.findAllByProject(project);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.trackingService.findOne(+id);
  }

  @Get(':id/history')
  async getHistory(@Param('id') id: string) {
    return this.trackingService.getHistory(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrackingDto: UpdateTrackingDto,
  ) {
    return this.trackingService.update(+id, updateTrackingDto);
  }

  @Patch(':id/balance')
  async updateBalance(
    @Param('id') id: string,
    @Body() updateBalanceDto: UpdateBalanceDto,
  ) {
    return this.trackingService.updateBalance(+id, updateBalanceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.trackingService.remove(+id);
  }
}
