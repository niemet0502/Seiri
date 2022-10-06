import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    let user = new User();
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    user.isConfirm = false;

    user = await this.save(user);

    delete user.password;

    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let toUpdate = await this.userRepository.findById(id);
    delete toUpdate.password;

    let updated = Object.assign(toUpdate, updateUserDto);
    return await this.userRepository.save(updated);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async save(user: User) {
    return await this.userRepository.save(user);
  }
}
