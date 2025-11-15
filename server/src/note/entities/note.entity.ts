import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../../project/entities/project.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @ManyToOne(() => Project, (project) => project.notes, { onDelete: 'CASCADE' })
  project: Project;

  @Column('text', { nullable: true })
  createdAt: string;

  @Column('text', { nullable: true })
  updatedAt: string;

  @Column('boolean', { default: false })
  isFav: boolean;
}
