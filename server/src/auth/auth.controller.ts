import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDecorator } from '../user/user.decorator';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginValidatorPipe } from './dto/validation.pipe';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body(new LoginValidatorPipe()) loginDto: LoginDto) {
    const user = await this.userService.findOne(loginDto);

    if (!user) {
      throw new HttpException(
        'Invalid Email or Password',
        HttpStatus.NOT_FOUND,
      );
    }

    const session = await this.authService.createSession(user);

    return { user, token: session.token };
  }

  @Post('logout')
  @HttpCode(204)
  async logout(@UserDecorator('token') token: string) {
    const session = await this.authService.findOne(token);

    if (!session) {
      const errors = { session: 'session not found' };
      throw new BadRequestException({ errors });
    }

    return await this.authService.remove(session);
  }
}
