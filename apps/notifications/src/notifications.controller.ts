import { Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CurrentUser, UserDocument } from '@app/common';
import { EventPattern } from '@nestjs/microservices';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe())
  @EventPattern('notify')
  @Post()
  emit(@CurrentUser() user: UserDocument) {
    return this.notificationsService.emit(user.email);
  }
}
