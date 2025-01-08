import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { QuestionProcessorService } from './question-processor.service';
import { CreateQuestionDto, Answer } from '@app/common';

@Controller()
export class QuestionProcessorController {
  constructor(
    private readonly questionProcessorService: QuestionProcessorService,
  ) {}

  @MessagePattern('create_question')
  create(@Payload() data: CreateQuestionDto) {
    return this.questionProcessorService.generate(data);
  }
  @MessagePattern('answered_task')
  correct(
    @Payload()
    data: Record<
      string,
      { questionHeader: string; correctAnswer: string; studentAnswer: Answer }
    >,
  ) {
    return this.questionProcessorService.correct(data);
  }
}
