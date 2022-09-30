import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  lastname: string;

  @Column('text')
  firstname: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;
}
