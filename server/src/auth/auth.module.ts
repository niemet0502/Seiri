import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Session } from './entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session]), UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
