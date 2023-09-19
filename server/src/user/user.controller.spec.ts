import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const user = {
  isConfirm: false,
  lastname: 'Marius',
  firstname: 'NIEMET',
  email: 'mariusniemet@gmail.com',
};

const newUser = {
  email: 'mariusniemet@gmail.com',
  password: 'password',
  confirm_password: 'password',
};

const users = [user];

describe('UserController', () => {
  let userController: UserController;

  const mockService = {
    findAll: jest.fn(() => users),
    findOne: jest.fn((dto) => {
      return {
        id: dto,
        ...user,
      };
    }),
    findByEmail: jest.fn((email) => {
      if (email === 'mariusniemet20@gmail.com')
        return {
          id: Date.now(),
          ...user,
        };

      return;
    }),
    create: jest.fn((dto) => {
      return {
        id: expect.any(Number),
        isConfirm: false,
        lastname: null,
        firstname: null,
        email: newUser.email,
      };
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

  describe('UserController.__findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(mockService, 'findAll').mockReturnValue(users);

      expect(await userController.findAll()).toEqual(users);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('UserController.__create', () => {
    it('should throw an error', async () => {
      const user = {
        email: 'mariusniemet20@gmail.com',
        password: 'password',
        confirm_password: 'password',
      };

      try {
        await userController.create(user);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
      }
    });

    it('should create a user given correct data', async () => {
      expect(
        await userController.create({
          ...newUser,
          email: 'mariusniemet@gmail.com',
        }),
      ).toEqual({
        id: expect.any(Number),
        isConfirm: false,
        lastname: null,
        firstname: null,
        email: newUser.email,
      });

      expect(mockService.create).toBeCalledWith({
        ...newUser,
        email: 'mariusniemet@gmail.com',
      });
      expect(mockService.create).toBeCalledTimes(1);
    });
  });
});
