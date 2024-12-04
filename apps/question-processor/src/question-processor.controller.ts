import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { QuestionProcessorService } from './question-processor.service';
import { CreateQuestionDto } from '@app/common';

@Controller()
export class QuestionProcessorController {
  constructor(
    private readonly questionProcessorService: QuestionProcessorService,
  ) {}

  @MessagePattern('create_task')
  create(@Payload() data: CreateQuestionDto, @Ctx() context: RmqContext) {
    console.log('Received task:', data, context);
    return this.questionProcessorService.generate(data);
  }
}
