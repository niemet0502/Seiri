import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from '../../auth/entities/session.entity';
import { Project } from '../../project/entities/project.entity';
import { Tracking } from '../../tracking/entities/tracking.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('boolean')
  isConfirm: boolean;

  @Column('text', { nullable: true })
  lastname: string;

  @Column('text', { nullable: true })
  firstname: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('longtext', { nullable: true, default: null })
  avatar: string;

  @OneToMany(() => Project, (project) => project.user) projects: Project[];
  @OneToMany(() => Session, (session) => session.user) sessions: Session[];
  @OneToMany(() => Tracking, (tracking) => tracking.user) trackings: Tracking[];
}
