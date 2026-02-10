import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { User } from '../../user/entities/user.entity';
import { TrackingHistory } from './tracking-history.entity';

@Entity()
export class Tracking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('date', { nullable: true })
  dueDate: Date;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  target: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  balance: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.trackings)
  user: User;

  @ManyToOne(() => Project, (project) => project.trackings)
  project: Project;

  @OneToMany(() => TrackingHistory, (history) => history.tracking, {
    cascade: true,
  })
  history: TrackingHistory[];

  @Column('boolean', { default: false })
  isDeleted: boolean;
}
