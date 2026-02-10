import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from './db/data-source';
import { SendEmailProcessor } from './mails/send-email-processor.service';
import { NoteModule } from './note/note.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { TrackingModule } from './tracking/tracking.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.CACHE_HOST,
        port: parseInt(process.env.CACHE_PORT, 10),
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      template: {
        dir: join(__dirname, 'mails'),
        adapter: new HandlebarsAdapter(),
      },
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    ProjectModule,
    TaskModule,
    NoteModule,
    TrackingModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, SendEmailProcessor],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
