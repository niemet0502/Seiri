import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column('text', { select: false })
  password: string;

  @OneToMany(() => Project, (project) => project.user) projects: Project[];
}
