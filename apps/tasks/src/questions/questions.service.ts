import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsRepository } from './questions.repository';
import { CreateQuestionDto, QUESTION_PROCESSOR_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    @Inject(QUESTION_PROCESSOR_SERVICE)
    private readonly questionProcessorService: ClientProxy,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    await this.validateCreateQuestionDto(createQuestionDto);
    console.log('Creating question:', createQuestionDto);
    return this.questionProcessorService
      .send('create_question', createQuestionDto)
      .pipe(
        map((res) => {
          for (const question of res) {
            this.questionsRepository.create({
              header: question.question,
              type: createQuestionDto.type,
              options: question.options,
              correctAnswer: question.correctAnswer,
              difficulty: createQuestionDto.difficulty,
              tags: createQuestionDto.tags,
              creatorId: createQuestionDto.creatorId,
            });
          }
          // return 'Questions created successfully';
        }),
      );
  }
  private async validateCreateQuestionDto(
    createQuestionDto: CreateQuestionDto,
  ) {
    try {
      await this.questionsRepository.findOne({
        header: createQuestionDto.header,
      });
    } catch (err) {
      return;
    }
    throw new UnprocessableEntityException('This question already exists.');
  }
  async findAll() {
    return await this.questionsRepository.find({});
  }

  async findOne(id: number) {
    return await this.questionsRepository.findOne({ _id: id });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return await this.questionsRepository.findOneAndUpdate(
      {
        _id: id,
      },
      updateQuestionDto,
    );
  }

  async remove(id: number) {
    return await this.questionsRepository.findOneAndDelete({
      _id: id,
    });
  }
}
