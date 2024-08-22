import { MiddlewareConsumer, Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { TaskModule } from '../task/task.module';
import { UserModule } from '../user/user.module';
import { Project } from './entities/project.entity';
import { ProjectController } from './project.controller';
import { ProjectRepository } from './project.repository';
import { ProjectService } from './project.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    forwardRef(() => TaskModule),
    forwardRef(() => UserModule),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
  exports: [ProjectService],
})
export class ProjectModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('projects');
  }
}
