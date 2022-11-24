import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Project } from '../project/entities/project.entity';
import { ProjectService } from '../project/project.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

const note = {
  id: 1,
  title: 'first note',
  content: 'empty content',
  project: null,
} as Note;

const project = {
  id: 1,
  name: 'project test',
  description: 'DSA resources',
  isArchive: false,
  user: null,
  notes: null,
} as Project;

const notes = [note];

describe('NoteController', () => {
  let controller: NoteController;

  const mockNoteService = {
    create: (createNoteDto: CreateNoteDto, project: Project) => note,
    findAllByProject: (project: Project) => notes,
    update: (id: number, updateNoteDto: UpdateNoteDto) => note,
    remove: (note: Note) => note,
    findById: (id: number) => note,
  };

  const mockProjectService = {
    findById: (id: number) => project,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [
        { provide: NoteService, useValue: mockNoteService },
        { provide: ProjectService, useValue: mockProjectService },
      ],
    }).compile();

    controller = module.get<NoteController>(NoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('NoteController.__create', () => {
    it('should create, save and return a brand new note', async () => {
      //arrange
      const createNoteDto = {
        title: 'note title',
        content: 'empty content',
        projectId: 1,
      };
      jest.spyOn(mockNoteService, 'create').mockReturnValue(note);
      jest.spyOn(mockProjectService, 'findById').mockReturnValue(project);

      //act
      const result = await controller.create(createNoteDto);

      //assert
      expect(result).toEqual(note);
      expect(mockProjectService.findById).toBeCalledWith(
        createNoteDto.projectId,
      );
      expect(mockNoteService.create).toBeCalledWith(createNoteDto, project);
    });

    it('should throw an HttpException error', async () => {
      //arrange
      const createNoteDto = {
        title: 'note title',
        content: 'empty content',
        projectId: 1,
      };
      jest.spyOn(mockProjectService, 'findById').mockReturnValue(null);

      try {
        await controller.create(createNoteDto);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
      }
    });
  });

  // describe('NoteController.__findAllByProject', () => {
  //   it('', async () => {});
  // });

  describe('NoteController.__findOne', () => {
    it('should find and return a note', async () => {
      //arrange
      const id = '1';
      jest.spyOn(mockNoteService, 'findById').mockReturnValue(note);

      //act
      const result = await controller.findOne(id);

      //assert
      expect(result).toEqual(note);
      expect(mockNoteService.findById).toBeCalledWith(+id);
    });
  });

  describe('NoteController.__update', () => {
    it('should update a note', async () => {
      //arrange
      const id = '1';
      const updateNoteDto = {
        title: 'note title',
        content: 'empty content',
        projectId: 1,
      };
      jest.spyOn(mockNoteService, 'update').mockReturnValue(note);

      //act
      const result = await controller.update(id, updateNoteDto);

      //assert
      expect(result).toEqual(note);
      expect(mockNoteService.update).toBeCalledWith(+id, updateNoteDto);
    });
  });

  // describe('NoteController.__remove', () => {
  //   it('', async () => {});
  // });
});
