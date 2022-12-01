import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginValidatorPipe } from './dto/validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body(new LoginValidatorPipe()) loginDto: LoginDto) {
    const user = await this.userService.findOne(loginDto);

    if (!user) {
      const errors = { user: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    const session = await this.authService.generateJWT(user);

    return { user, token: session.token };
  }
}