import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../auth/auth.middleware';
import { Project } from '../project/entities/project.entity';
import { ProjectModule } from '../project/project.module';
import { UserModule } from '../user/user.module';
import { TrackingHistory } from './entities/tracking-history.entity';
import { Tracking } from './entities/tracking.entity';
import { TrackingController } from './tracking.controller';
import { TrackingRepository } from './tracking.repository';
import { TrackingService } from './tracking.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tracking, TrackingHistory, Project]),
    UserModule,
    ProjectModule,
  ],
  controllers: [TrackingController],
  providers: [TrackingService, TrackingRepository],
  exports: [TrackingRepository, TrackingService],
})
export class TrackingModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('tracking');
  }
}
