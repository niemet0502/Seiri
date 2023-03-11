import { Injectable } from '@nestjs/common';
import { Project } from 'src/project/entities/project.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { NoteRepository } from './note.repository';

@Injectable()
export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async create(createNoteDto: CreateNoteDto, project: Project) {
    const { title, content } = createNoteDto;

    const note = new Note();
    note.content = content;
    note.title = title;
    note.createdAt = new Date();
    note.updatedAt = new Date();

    note.project = project;

    return await this.noteRepository.save(note);
  }

  async findAllByProject(project: Project) {
    return await this.noteRepository.findAllByProject(project);
  }

  async findById(id: number) {
    return await this.noteRepository.findById(id);
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const toUpdated = await this.noteRepository.findById(id);

    const updated = Object.assign(toUpdated, updateNoteDto);

    return await this.noteRepository.save({
      ...updated,
      updatedAt: new Date(),
    });
  }

  async remove(note: Note) {
    return await this.noteRepository.remove(note);
  }
}
