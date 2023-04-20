import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserValidatorPipe } from './dto/validation.pipe';
import { User } from './entities/user.entity';
import { UserDecorator } from './user.decorator';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body(new CreateUserValidatorPipe()) createUserDto: CreateUserDto,
  ) {
    let user = await this.userService.findByEmail(createUserDto.email);

    if (user) {
      const errors = { email: 'email already use' };
      throw new HttpException({ errors }, 401);
    }

    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(+id, updateUserDto);
  }

  @Patch('/updatePassword')
  async updatePassword() {}

  @Delete()
  @HttpCode(204)
  async remove(@UserDecorator() user: User) {
    return await this.userService.remove(user);
  }

  @Patch('/resetPassword')
  async resetPassword() {}
}
