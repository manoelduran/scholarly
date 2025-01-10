import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  emit(): string {
    return 'Hello World!';
  }
}
