import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Note } from '../../note/entities/note.entity';
import { User } from '../../user/entities/user.entity';
@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.projects) user: User;

  @OneToMany(() => Note, (note) => note.project) notes: Note[];

  @Column('boolean', { default: false })
  isArchive: boolean;
}
