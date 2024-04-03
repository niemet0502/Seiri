import { BullModule } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

const user = {
  id: 1,
  isConfirm: false,
  lastname: 'Marius',
  firstname: 'NIEMET',
  email: 'mariusniemet@gmail.com',
};

const users = [user];

describe('UserService', () => {
  let userService: UserService;

  const mockRepository = {
    save: (user: User) => user,
    findById: (id: number) => user,
    findByEmail: (email: string) => user,
    findAll: () => users,
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: 'sendEmail',
        }),
      ],
      providers: [
        UserService,
        { provide: AuthService, useValue: {} },
        UserRepository,
        {
          provide: 'sendEmail', // Queue token
          useFactory: () => ({
            add: jest.fn(),
          }),
        },
      ],
    })
      .overrideProvider(UserRepository)
      .useValue(mockRepository)
      .compile();

    userService = module.get<UserService>(UserService);
  });

  describe('UserService.__findAll', () => {
    it('should return a users array ', async () => {
      jest.spyOn(mockRepository, 'findAll').mockImplementation(() => users);

      expect(await userService.findAll()).toEqual(users);
      expect(mockRepository.findAll).toBeCalledTimes(1);
    });
  });

  describe('UserService.__findByEmail', () => {
    it('should return a user by email ', async () => {
      const email = 'mariusniemet20@gmail.com';

      jest.spyOn(mockRepository, 'findByEmail').mockReturnValue(user);

      expect(await userService.findByEmail(email)).toEqual(user);
      expect(mockRepository.findByEmail).toBeCalledWith(email);
      expect(mockRepository.findByEmail).toBeCalledTimes(1);
    });
  });
});
