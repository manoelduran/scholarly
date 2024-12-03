import { Test, TestingModule } from '@nestjs/testing';
import { RmqContext } from '@nestjs/microservices';
import { CreateTaskDto } from '@app/common';
import { QuestionProcessorController } from './question-processor.controller';
import { QuestionProcessorService } from './question-processor.service';

describe('QuestionProcessorController', () => {
  let questionProcessorController: QuestionProcessorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [QuestionProcessorController],
      providers: [QuestionProcessorService],
    }).compile();

    questionProcessorController = app.get<QuestionProcessorController>(
      QuestionProcessorController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const data = {} as CreateTaskDto;
      const ctx = {} as RmqContext;
      expect(questionProcessorController.create(data, ctx)).toBe(
        'Hello World!',
      );
    });
  });
});
