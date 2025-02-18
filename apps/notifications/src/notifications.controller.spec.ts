import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { EmitNotificationsDto, SubjectEnum } from '@app/common';

describe('NotificationsController', () => {
  let notificationsController: NotificationsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [NotificationsService],
    }).compile();

    notificationsController = app.get<NotificationsController>(
      NotificationsController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const ok = {
        email: 'dasdasdsa@gmail.com',
        text: 'Hello World!',
        subject: SubjectEnum['Answered Task'],
      } as EmitNotificationsDto;
      expect(notificationsController.emit(ok)).toBe('Hello World!');
    });
  });
});
