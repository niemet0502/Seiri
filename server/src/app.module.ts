import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Session } from './auth/entities/session.entity';
import { Note } from './note/entities/note.entity';
import { NoteModule } from './note/note.module';
import { Project } from './project/entities/project.entity';
import { ProjectModule } from './project/project.module';
import { Task } from './task/entities/task.entity';
import { TaskModule } from './task/task.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'thot',
      entities: [User, Project, Session, Note, Task],
      synchronize: true,
    }),
    UserModule,
    ProjectModule,
    TaskModule,
    NoteModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
