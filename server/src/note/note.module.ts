import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { ProjectModule } from 'src/project/project.module';
import { UserModule } from 'src/user/user.module';
import { Note } from './entities/note.entity';
import { NoteController } from './note.controller';
import { NoteRepository } from './note.repository';
import { NoteService } from './note.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), ProjectModule, UserModule],
  controllers: [NoteController],
  providers: [NoteService, NoteRepository],
})
export class NoteModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('note');
  }
}
