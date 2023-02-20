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
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'thot',
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
