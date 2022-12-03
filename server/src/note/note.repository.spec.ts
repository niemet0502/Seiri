import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { NoteRepository } from './note.repository';

const note = {
  id: 1,
  title: 'first note',
  content: 'empty content',
  project: null,
} as Note;

const notes = [note];

describe('NoteRepository', () => {
  let repository: NoteRepository;

  const mockRepository = {
    save: (note: Note) => note,
    find: (id: any) => notes,
    findOne: (id: number) => note,
    remove: (note: Note) => note,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteRepository,
        {
          provide: getRepositoryToken(Note),
          useValue: mockRepository,
        },
      ],
    }).compile();

    repository = module.get<NoteRepository>(NoteRepository);
  });

  describe('NoteRepository.__save', () => {
    it('should save and return a given note', async () => {
      //arrange
      const note = {
        id: 1,
        title: 'first note',
        content: 'empty content',
        project: null,
      } as Note;
      jest.spyOn(mockRepository, 'save').mockReturnValue(note);

      //act
      const result = await repository.save(note);

      //assery
      expect(result).toEqual(note);
      expect(mockRepository.save).toBeCalledWith(note);
      expect(mockRepository.save).toBeCalledTimes(1);
    });
  });

  describe('NoteRepository.__findAllByProject', () => {
    it('should find and return note related to a given project', async () => {
      const project = {
        id: 1,
        name: 'First project',
        description: 'description',
        user: null,
        notes: null,
        isArchive: false,
        tasks: null,
      };
      jest.spyOn(mockRepository, 'find').mockReturnValue(notes);

      //act
      const result = await repository.findAllByProject(project);

      //assert
      expect(result).toEqual(notes);
      expect(mockRepository.find).toBeCalledWith({
        where: { project: project },
      });
      expect(mockRepository.find).toBeCalledTimes(1);
    });
  });

  describe('NoteRepository.__findById', () => {
    it('Should find by id a note and return it', async () => {
      //arrange
      const id = 1;
      jest.spyOn(mockRepository, 'findOne').mockReturnValue(note);

      //act
      const result = await repository.findById(id);
      //assert
      expect(result).toEqual(note);
      expect(mockRepository.findOne).toBeCalledWith({ where: { id: id } });
      expect(mockRepository.findOne).toBeCalledTimes(1);
    });
  });

  describe('NoteRepository.__remove', () => {
    it('should remove and return a given note', async () => {
      //arrange
      const note = {
        id: 1,
        title: 'first note',
        content: 'empty content',
        project: null,
      } as Note;
      jest.spyOn(mockRepository, 'remove').mockReturnValue(note);

      //act
      const result = await repository.remove(note);

      //assery
      expect(result).toEqual(note);
      expect(mockRepository.remove).toBeCalledWith(note);
      expect(mockRepository.remove).toBeCalledTimes(1);
    });
  });
});
