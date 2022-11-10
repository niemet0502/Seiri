import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @OneToMany(() => Project, (project) => project.tasks) project: Project;

  @Column('boolean', { default: false })
  isDeleted: boolean;

  //  dueDate, parent_id[nullable,ForeignKey],isDeleted TODO
}
