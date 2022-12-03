import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column('boolean', { default: false })
  isArchive: boolean;
}
