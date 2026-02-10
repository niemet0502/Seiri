import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../project/entities/project.entity';
import { User } from '../user/entities/user.entity';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { TrackingHistory } from './entities/tracking-history.entity';
import { Tracking } from './entities/tracking.entity';
import { TrackingRepository } from './tracking.repository';

@Injectable()
export class TrackingService {
  constructor(
    private readonly trackingRepository: TrackingRepository,
    @InjectRepository(TrackingHistory)
    private readonly historyRepository: Repository<TrackingHistory>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createTrackingDto: CreateTrackingDto, user: User) {
    const { title, description, dueDate, target, balance, projectId } = createTrackingDto;

    // Validate that the project exists and belongs to the user
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['user'],
    });

    if (!project) {
      throw new BadRequestException({ errors: { project: 'Project not found' } });
    }

    if (project.user.id !== user.id) {
      throw new BadRequestException({ errors: { project: 'Project does not belong to user' } });
    }

    const tracking = new Tracking();
    tracking.title = title;
    tracking.description = description;
    tracking.dueDate = dueDate;
    tracking.target = target;
    tracking.balance = balance || 0;
    tracking.user = user;
    tracking.project = project;
    tracking.isDeleted = false;

    const savedTracking = await this.trackingRepository.save(tracking);

    // If initial balance is provided, create a history entry
    if (balance && balance > 0) {
      const history = new TrackingHistory();
      history.amount = balance;
      history.tracking = savedTracking;
      await this.historyRepository.save(history);
    }

    return savedTracking;
  }

  async findAll(user: User) {
    return await this.trackingRepository.findAll(user);
  }

  async findAllByProject(project: Project) {
    return await this.trackingRepository.findAllByProject(project);
  }

  async findOne(id: number) {
    const tracking = await this.trackingRepository.findById(id);

    if (!tracking) {
      throw new BadRequestException({ errors: { tracking: 'Tracking not found' } });
    }

    return tracking;
  }

  async update(id: number, updateTrackingDto: UpdateTrackingDto) {
    const toUpdate = await this.trackingRepository.findById(id);

    if (!toUpdate) {
      throw new BadRequestException({ errors: { tracking: 'Tracking not found' } });
    }

    const updated = Object.assign(toUpdate, updateTrackingDto);
    return await this.trackingRepository.save(updated);
  }

  async updateBalance(id: number, updateBalanceDto: UpdateBalanceDto) {
    const tracking = await this.trackingRepository.findById(id);

    if (!tracking) {
      throw new BadRequestException({ errors: { tracking: 'Tracking not found' } });
    }

    // Update the balance
    tracking.balance = Number(tracking.balance) + Number(updateBalanceDto.amount);
    const updatedTracking = await this.trackingRepository.save(tracking);

    // Create history entry
    const history = new TrackingHistory();
    history.amount = updateBalanceDto.amount;
    history.tracking = updatedTracking;
    await this.historyRepository.save(history);

    return updatedTracking;
  }

  async remove(id: number) {
    const tracking = await this.trackingRepository.findById(id);

    if (!tracking) {
      throw new BadRequestException({ errors: { tracking: 'Tracking not found' } });
    }

    return await this.trackingRepository.remove(tracking);
  }

  async getHistory(id: number) {
    const tracking = await this.trackingRepository.findById(id);

    if (!tracking) {
      throw new BadRequestException({ errors: { tracking: 'Tracking not found' } });
    }

    return tracking.history;
  }
}
