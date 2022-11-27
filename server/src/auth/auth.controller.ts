import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { LoginValidatorPipe } from './dto/validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body(new LoginValidatorPipe()) loginDto: LoginDto) {
    const user = await this.userService.findOne(loginDto);

    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    const token = await this.userService.generateJWT(user);

    return { user, token };
  }
}
