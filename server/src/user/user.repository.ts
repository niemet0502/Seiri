import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email: email } });
  }

  async save(user: User) {
    return await this.usersRepository.save(user);
  }
}
