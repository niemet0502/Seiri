import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../project/entities/project.entity';
import { User } from '../user/entities/user.entity';
import { Tracking } from './entities/tracking.entity';

@Injectable()
export class TrackingRepository {
  constructor(
    @InjectRepository(Tracking)
    private trackingRepository: Repository<Tracking>,
  ) {}

  async save(tracking: Tracking) {
    return await this.trackingRepository.save(tracking);
  }

  async findAll(user: User): Promise<Tracking[]> {
    return await this.trackingRepository.find({
      where: { user: { id: user.id }, isDeleted: false },
      relations: ['history'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAllByProject(project: Project): Promise<Tracking[]> {
    return await this.trackingRepository.find({
      where: { project: { id: project.id }, isDeleted: false },
      relations: ['history', 'project'],
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: number): Promise<Tracking | undefined> {
    return await this.trackingRepository.findOne({
      where: { id, isDeleted: false },
      relations: ['history', 'user'],
    });
  }

  async remove(tracking: Tracking) {
    return await this.trackingRepository.save({ ...tracking, isDeleted: true });
  }
}
