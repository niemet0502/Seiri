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

    await this.mailService.sendMail({
      to: email,
      from: 'mariusvniemet@gmail.com',
      subject: 'Welcome on Seiri',
      template: 'welcome',
      context: {
        user: job.data,
        web_app_link: job.data.web_app_link,
        logo: process.env.WEB_APP_ADDRESS + 'white-logo.png',
      },
    });
  }

  @Process('resetPasswordEmail')
  async resetPasswordEmail(job: any) {
    const { email, token, user } = job.data;
    this.logger.log(`job running ${email}`);

    await this.mailService.sendMail({
      to: email,
      from: 'mariusvniemet@gmail.com',
      subject: 'Seiri Password Reset Request',
      template: 'resetpassword',
      context: {
        firstname: user.firstname,
        lastname: user.lastname,
        web_app_link: job.data.web_app_link,
        logo: process.env.WEB_APP_ADDRESS + 'white-logo.png',
      },
    });
  }
}
