import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository, NotificationDocument } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NotificationsRepository extends AbstractRepository<NotificationDocument> {
  protected readonly logger = new Logger(NotificationsRepository.name);

  constructor(
    @InjectModel(NotificationDocument.name)
    notificationModel: Model<NotificationDocument>,
  ) {
    super(notificationModel);
  }
}
