import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { AuthService } from './auth.service';
import { Session } from './entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session]), UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'auth/logout', method: RequestMethod.POST });
  }
}
