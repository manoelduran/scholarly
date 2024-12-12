import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { QuestionProcessorService } from './question-processor.service';
import { CreateQuestionDto, AnswerTaskDto } from '@app/common';

@Controller()
export class QuestionProcessorController {
  constructor(
    private readonly questionProcessorService: QuestionProcessorService,
  ) {}

  @MessagePattern('create_question')
  create(@Payload() data: CreateQuestionDto, @Ctx() context: RmqContext) {
    console.log('Received question:', data, context);
    return this.questionProcessorService.generate(data);
  }
  @MessagePattern('answered_task')
  correct(@Payload() data: AnswerTaskDto, @Ctx() context: RmqContext) {
    console.log('answered_task', data, context);
    return this.questionProcessorService.correct(data);
  }
}
