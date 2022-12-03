import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../../project/entities/project.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  title: string;

  @Column('boolean', { default: false })
  isDone: boolean;

  @Column('text', { nullable: true })
  description: string;

  @ManyToOne(() => Project, (project) => project.tasks, { onDelete: 'CASCADE' })
  project: Project;

  @Column('boolean', { default: false })
  isDeleted: boolean;

  //  dueDate, parent_id[nullable,ForeignKey],isDeleted TODO
}
