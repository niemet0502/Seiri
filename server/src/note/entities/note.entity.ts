import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('longtext', { nullable: true })
  content: string;

  @ManyToOne(() => Project, (project) => project.notes, { onDelete: 'CASCADE' })
  project: Project;
}
