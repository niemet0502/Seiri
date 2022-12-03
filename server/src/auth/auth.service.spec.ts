import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { Session } from './entities/session.entity';

const session = {
  id: 1,
  token: 'oweoriweoidnndasndlaskndjeoqweqweque09qwndasdoiashoidhue09qwue',
  expirationDate: new Date(),
  user: null,
};

describe('AuthService', () => {
  let service: AuthService;

  const mockSessionRepository = {
    findOne: (token: string) => session,
    remove: (session: Session) => session,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Session),
          useValue: mockSessionRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('AuthService.__findOne', () => {
    it('should find a session by a given token and return it', async () => {
      //arrange
      const token =
        'oweoriweoidnndasndlaskndjeoqweqweque09qwndasdoiashoidhue09qwue';
      jest.spyOn(mockSessionRepository, 'findOne').mockReturnValue(session);

      //act
      const result = await service.findOne(token);

      //assert
      expect(result).toEqual(session);
      expect(mockSessionRepository.findOne).toBeCalledWith({
        where: { token: token },
      });
    });
  });

  describe('AuthService.__remove', () => {
    it('should remove a given session ', async () => {
      jest.spyOn(mockSessionRepository, 'remove').mockReturnValue(session);

      //act
      const result = await service.remove(session);

      //assert
      expect(result).toEqual(session);
      expect(mockSessionRepository.remove).toBeCalled();
    });
  });
});
