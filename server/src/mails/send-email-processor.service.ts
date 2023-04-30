import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';

@Processor('sendEmail')
export class SendEmailProcessor {
  private readonly logger = new Logger('EmailSending');
  constructor(private readonly mailService: MailerService) {}
  @Process('welcomeEmail')
  async sendWelcomeEmail(job: any) {
    const { email } = job.data;
    this.logger.log(`job running ${email}`);
  }
}
