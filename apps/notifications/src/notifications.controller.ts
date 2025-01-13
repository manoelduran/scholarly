import { Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EmitNotificationsDto } from '@app/common';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe())
  @EventPattern('notify_email')
  @Post()
  emit(@Payload() data: EmitNotificationsDto) {
    return this.notificationsService.emit(data);
  }
}
