import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async emit(email: string) {
    await this.notificationsRepository.create({
      message: 'Hello World!',
      emittedBy: email,
    });
    return 'Hello World!';
  }
}
