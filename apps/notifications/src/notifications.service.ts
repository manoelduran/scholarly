import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { NotificationsRepository } from './notifications.repository';

import { ConfigService } from '@nestjs/config';
import { EmitNotificationsDto } from '@app/common';

@Injectable()
export class NotificationsService {
  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.getOrThrow('SMTP_USER'),
      clientId: this.configService.getOrThrow('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.getOrThrow('GOOGLE_OAUTH_CLIENT_SECRET'),
      refreshToken: this.configService.getOrThrow('GOOGLE_OAUTH_REFRESH_TOKEN'),
    },
  });
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly configService: ConfigService,
  ) {}

  async emit({ email, subject, text }: EmitNotificationsDto) {
    await this.transporter.sendMail({
      from: this.configService.getOrThrow('SMTP_USER'),
      to: email,
      subject,
      text,
    });
    const ok = await this.notificationsRepository.create({
      message: text,
      subject,
      emittedBy: email,
    });
    return ok;
  }
}
