import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  token: string;

  @Column('date', { nullable: false })
  expirationDate: Date;

  @ManyToOne(() => User, (user) => user.sessions) user: User;
}
