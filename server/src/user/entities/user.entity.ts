import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from '../../auth/entities/session.entity';
import { Project } from '../../project/entities/project.entity';
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

  @OneToMany(() => Project, (project) => project.user) projects: Project[];
  @OneToMany(() => Session, (session) => session.user) sessions: Session[];
}
