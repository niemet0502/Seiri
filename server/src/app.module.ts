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
import { NoteModule } from './note/note.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { MailsService } from './mails/mails.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: '172.17.0.2',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'sendEmail',
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: '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',
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailsService],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
