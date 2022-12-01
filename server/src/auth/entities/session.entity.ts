import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
