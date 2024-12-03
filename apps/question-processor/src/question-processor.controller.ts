import { Controller } from '@nestjs/common';

import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateTaskDto } from '@app/common';
import { QuestionProcessorService } from './question-processor.service';

@Controller()
export class QuestionProcessorController {
  constructor(
    private readonly questionProcessorService: QuestionProcessorService,
  ) {}

  @MessagePattern('create_task')
  create(@Payload() data: CreateTaskDto, @Ctx() context: RmqContext) {
    console.log('Received task:', data, context);
    return this.questionProcessorService.generateTask(data);
  }
}
