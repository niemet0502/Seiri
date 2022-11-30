import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { LoginDto } from './dto/login.dto';

const user = {
  id: 1,
  isConfirm: false,
  lastname: 'Marius',
  firstname: 'NIEMET',
  email: 'mariusniemet@gmail.com',
};

describe('AuthController', () => {
  let controller: AuthController;

  const mockUserService = {
    findOne: (loginDto: LoginDto) => user,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
