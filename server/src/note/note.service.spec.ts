import { Test, TestingModule } from '@nestjs/testing';
import { Project } from '../project/entities/project.entity';
import { Note } from './entities/note.entity';
import { NoteRepository } from './note.repository';
import { NoteService } from './note.service';

const note = {
  id: 1,
  title: 'first note',
  content: 'empty content',
  project: null,
} as Note;

const notes = [note];

describe('NoteService', () => {
  let service: NoteService;

  const mockRepository = {
    save: (note: Note) => note,
    findAllByProject: (project: Project) => notes,
    findById: (id: number) => note,
    remove: (note: Note) => note,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        {
          provide: NoteRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<NoteService>(NoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('NoteService.__create', () => {
    it('should create, save and return a note', async () => {
      const createNoteDto = {
        title: 'note title',
        content: 'empty content',
        projectId: 1,
      };
      const project = {
        id: 1,
        name: 'project test',
        description: 'DSA resources',
        isArchive: false,
        user: null,
        notes: null,
      };
      jest.spyOn(mockRepository, 'save').mockReturnValue(note);

      //act
      const result = await service.create(createNoteDto, project);

      //assert
      expect(result).toEqual(note);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  describe('NoteService.__findAllByProject', () => {
    it('should find a list of notes related to a given project and return the list', async () => {
      //act
      const project = {
        id: 1,
        name: 'project test',
        description: 'DSA resources',
        isArchive: false,
        user: null,
        notes: null,
      };
      jest.spyOn(mockRepository, 'findAllByProject').mockReturnValue(notes);

      //act
      const result = await service.findAllByProject(project);

      //assert
      expect(result).toEqual(notes);
      expect(mockRepository.findAllByProject).toBeCalled();
      expect(mockRepository.findAllByProject).toBeCalledWith(project);
      expect(mockRepository.findAllByProject).toBeCalledTimes(1);
    });
  });

  describe('NoteService.__findById', () => {
    it('should find and return a note by id', async () => {
      //arrange
      const id = 1;
      jest.spyOn(mockRepository, 'findById').mockReturnValue(note);

      //act
      const result = await service.findById(id);

      //assert
      expect(result).toEqual(note);
      expect(mockRepository.findById).toBeCalledWith(id);
      expect(mockRepository.findById).toBeCalledTimes(1);
    });
  });

  describe('NoteService.__update', () => {
    it('should update a given note', async () => {
      //act
      const id = 1;
      const updateNoteDto = {
        title: 'note title',
        content: 'empty content',
        projectId: 1,
      };
      jest.spyOn(mockRepository, 'findById').mockReturnValue(note);
      jest.spyOn(mockRepository, 'save').mockReturnValue(note);

      //act
      const result = await service.update(id, updateNoteDto);

      //assert
      expect(result).toEqual(note);
      expect(mockRepository.findById).toBeCalledWith(id);
      expect(mockRepository.save).toBeCalled();
    });
  });

  describe('NoteService.__remove', () => {
    it('should remove and return a fiven note', async () => {
      //arrange
      const note = {
        id: 1,
        title: 'first note',
        content: 'empty content',
        project: null,
      } as Note;
      jest.spyOn(mockRepository, 'remove').mockReturnValue(note);

      //act
      const result = await service.remove(note);

      //assert
      expect(result).toEqual(note);
      expect(mockRepository.remove).toBeCalledWith(note);
    });
  });
});
