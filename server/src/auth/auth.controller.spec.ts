import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

const user = {
  id: 1,
  isConfirm: false,
  lastname: 'Marius',
  firstname: 'NIEMET',
  email: 'mariusniemet@gmail.com',
};

const session = {
  user,
  token: 'oweoriweoidnndasndlaskndjeoqweqweque09qwndasdoiashoidhue09qwue',
};

describe('AuthController', () => {
  let controller: AuthController;

  const mockUserService = {
    findOne: (loginDto: LoginDto) => user,
  };

  const mockAuthService = {
    createSession: (user: User) => session,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('AuthController.__login', () => {
    it('should create a session for a given user and return his token', async () => {
      //arrange
      const loginDto = {
        email: 'mariusniemet20@gmail.com',
        password: 'password',
      };
      jest.spyOn(mockUserService, 'findOne').mockReturnValue(user);
      jest.spyOn(mockAuthService, 'createSession').mockReturnValue(session);

      //act
      const result = await controller.login(loginDto);

      //assert
      expect(result).toEqual(session);
      expect(mockUserService.findOne).toBeCalledWith(loginDto);
      expect(mockAuthService.createSession).toBeCalledWith(user);
    });

    it('should throw a HttpException exception', async () => {
      //arrange
      const loginDto = {
        email: 'mariusniemet20@gmail.com',
        password: 'password',
      };
      jest.spyOn(mockUserService, 'findOne').mockReturnValue(null);

      try {
        await controller.login(loginDto);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
      }
    });
  });
});
