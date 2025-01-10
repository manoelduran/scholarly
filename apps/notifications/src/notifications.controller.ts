import { Controller, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // @UsePipes(new ValidationPipe())
  // @EventPattern('notify')
  @Post()
  emit(): string {
    return this.notificationsService.emit();
  }
}
