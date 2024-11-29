import { Test, TestingModule } from '@nestjs/testing';
import { TaskProcessorController } from './task-processor.controller';
import { TaskProcessorService } from './task-processor.service';

describe('TaskProcessorController', () => {
  let taskProcessorController: TaskProcessorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskProcessorController],
      providers: [TaskProcessorService],
    }).compile();

    taskProcessorController = app.get<TaskProcessorController>(
      TaskProcessorController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(taskProcessorController.getHello()).toBe('Hello World!');
    });
  });
});
