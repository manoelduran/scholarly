import { Inject, Injectable } from '@nestjs/common';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsRepository } from './questions.repository';
import { CreateQuestionDto, QUESTION_PROCESSOR_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { Types } from 'mongoose';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    @Inject(QUESTION_PROCESSOR_SERVICE)
    private readonly questionProcessorService: ClientProxy,
  ) {}

  async create(
    createQuestionDto: CreateQuestionDto,
    creatorId: Types.ObjectId,
  ) {
    return this.questionProcessorService
      .send('create_question', createQuestionDto)
      .pipe(
        map((res) => {
          for (const question of res) {
            this.questionsRepository.create({
              header: question.question,
              classGroup: createQuestionDto.header,
              type: createQuestionDto.type,
              options: question.options,
              correctAnswer: question.correctAnswer,
              difficulty: createQuestionDto.difficulty,
              tags: createQuestionDto.tags,
              creatorId: creatorId,
            });
          }
        }),
      );
  }

  async findAll() {
    return await this.questionsRepository.find({});
  }

  async findOne(id: string) {
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
