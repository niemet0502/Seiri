import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userService: UserService;
  let userController: UserController;

  const mockService = {
    findAll: jest.fn((dto) => {
      return [
        {
          id: 1,
          isConfirm: false,
          lastname: 'Marius',
          firstname: 'NIEMET',
          email: 'mariusniemet@gmail.com',
        },
        {
          id: 2,
          isConfirm: false,
          lastname: 'vincent',
          firstname: 'NIEMET',
          email: 'mariusniemet20@gmail.com',
        },
      ];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockService)
      .compile();

    userController = module.get<UserController>(UserController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockResponse = [
        {
          id: 1,
          isConfirm: false,
          lastname: 'Marius',
          firstname: 'NIEMET',
          email: 'mariusniemet@gmail.com',
        },
        {
          id: 2,
          isConfirm: false,
          lastname: 'vincent',
          firstname: 'NIEMET',
          email: 'mariusniemet20@gmail.com',
        },
      ];

      expect(await userController.findAll()).toEqual(mockResponse);
    });
  });
});
