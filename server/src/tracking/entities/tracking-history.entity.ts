import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Tracking } from './tracking.entity';

@Entity()
export class TrackingHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  amount: number;

  @CreateDateColumn({ name: 'createdAt' })
  date: Date;

  @ManyToOne(() => Tracking, (tracking) => tracking.history, {
    onDelete: 'CASCADE',
  })
  tracking: Tracking;
}
