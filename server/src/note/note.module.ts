import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from 'src/project/project.module';
import { Note } from './entities/note.entity';
import { NoteController } from './note.controller';
import { NoteRepository } from './note.repository';
import { NoteService } from './note.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), ProjectModule],
  controllers: [NoteController],
  providers: [NoteService, NoteRepository],
})
export class NoteModule {}
