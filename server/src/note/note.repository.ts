import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteRepository {
  constructor(
    @InjectRepository(Note) private notesRepository: Repository<Note>,
  ) {}

  async save(note: Note): Promise<Note> {
    return await this.notesRepository.save(note);
  }

  async findAllByProject(project: Project) {
    return await this.notesRepository.find({ where: { project: project } });
  }

  async findById(id: number): Promise<Note | undefined> {
    return await this.notesRepository.findOne({ where: { id: id } });
  }

  async remove(note: Note) {
    return await this.notesRepository.remove(note);
  }
}
