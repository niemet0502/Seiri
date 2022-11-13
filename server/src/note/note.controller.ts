import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectService } from '../project/project.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { CreateNoteValidatorPipe } from './dto/validation.pipe';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
  constructor(
    private readonly noteService: NoteService,
    private readonly projectService: ProjectService,
  ) {}

  @Post()
  async create(
    @Body(new CreateNoteValidatorPipe()) createNoteDto: CreateNoteDto,
  ) {
    const project = await this.projectService.findById(
      +createNoteDto.projectId,
    );

    if (!project) {
      const errors = { project: 'project not found' };
      return new HttpException({ errors }, 401);
    }

    return this.noteService.create(createNoteDto, project);
  }

  @Get()
  async findAllByProject(@Param('id') id: number) {
    const project = await this.projectService.findById(+id);

    if (!project) {
      const errors = { project: 'project not found' };
      return new HttpException({ errors }, 401);
    }

    return await this.noteService.findAllByProject(project);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noteService.findById(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return await this.noteService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const note = await this.noteService.findById(+id);

    if (!note) {
      const errors = { note: 'note not found' };
      return new HttpException({ errors }, 401);
    }

    return this.noteService.remove(note);
  }
}
