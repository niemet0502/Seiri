import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find({
      select: ['id', 'lastname', 'isConfirm', 'firstname', 'email'],
    });
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email: email } });
  }

  async save(user: User) {
    return await this.usersRepository.save(user);
  }

  async findById(id: number) {
    return await this.usersRepository.findOne({
      select: ['id', 'lastname', 'isConfirm', 'firstname', 'email'],
      where: {
        id: id,
      },
    });
  }
}
