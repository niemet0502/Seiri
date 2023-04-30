import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidatorPipe } from './dto/p-validation.pipe';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdatePasswordSchema } from './dto/update-password.schema';
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
      throw new HttpException(
        'This email address is already registered',
        HttpStatus.CONFLICT,
      );
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

  @Put('/updatepassword')
  async updatePassword(
    @Body(new ValidatorPipe<UpdatePasswordDto>(UpdatePasswordSchema))
    updatePassword: UpdatePasswordDto,
    @UserDecorator() user: User,
  ) {
    if (!user) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return await this.userService.updatePassword(user, updatePassword);
  }

  @Delete()
  @HttpCode(204)
  async remove(@UserDecorator() user: User) {
    if (!user) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return await this.userService.remove(user);
  }

  @Put('/resetpassword')
  async resetPassword() {
    return 'marius';
  }
}
