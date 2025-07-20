import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly resend: Resend;

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));
  }

  async sendEmail(
    to: string | string[],
    subject: string,
    html: string,
    from: string = this.configService.get<string>('DEFAULT_FROM_EMAIL') as any,
  ): Promise<void> {
    try {
      await this.resend.emails.send({
        from,
        to,
        subject,
        html,
      });
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}