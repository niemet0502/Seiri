import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

const user = {
  id: 1,
  isConfirm: false,
  lastname: 'Marius',
  firstname: 'NIEMET',
  email: 'mariusniemet@gmail.com',
};

const users = [user];

describe('UserRepository', () => {
  let userRepository: UserRepository;

  const mockRepository = {
    findOne: (email: any) => user,
    find: () => users,
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('UserRepository.__findById', () => {
    it('should find a user by id and return the user', async () => {
      const userId = 1;

      jest.spyOn(mockRepository, 'findOne').mockReturnValue(user);

      expect(await userRepository.findById(userId)).toEqual(user);
      expect(mockRepository.findOne).toBeCalledWith({
        select: ['id', 'lastname', 'isConfirm', 'firstname', 'email'],
        where: { id: userId },
      });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('UserRepository.__findByEmail', () => {
    it('shoud find a user by email and return the user', async () => {
      const email = 'mariusniemet@gmail.com';

      jest.spyOn(mockRepository, 'findOne').mockReturnValue(user);

      expect(await userRepository.findByEmail(email)).toEqual(user);
      expect(mockRepository.findOne).toBeCalledWith({
        where: { email: email },
      });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(2);
    });
  });

  describe('User.Repository.__findAll', () => {
    it('should return a users array', async () => {
      jest.spyOn(mockRepository, 'find').mockReturnValue(users);

      expect(await userRepository.findAll()).toEqual(users);
      expect(mockRepository.find).toBeCalledTimes(1);
    });
  });
});
