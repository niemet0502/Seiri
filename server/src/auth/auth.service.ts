import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { SECRET } from '../config';
import { User } from '../user/entities/user.entity';
import { Session } from './entities/session.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
  ) {}

  async createSession(user: User) {
    const session = new Session();
    let today = new Date();

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      SECRET,
    );

    session.token = token;
    session.expirationDate = new Date(today.setMonth(today.getMonth() + 5));

    return await this.sessionRepository.save(session);
  }

  async findOne(token: string) {
    return await this.sessionRepository.findOne({ where: { token: token } });
  }

  async remove(session: Session) {
    return await this.sessionRepository.remove(session);
  }
}
