import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AnswerTaskDto, QUESTION_PROCESSOR_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { Types } from 'mongoose';
import { StudentAnswersRepository } from './answers.repository';

@Injectable()
export class StudentAnswerService {
  constructor(
    private readonly studentAnswerRepository: StudentAnswersRepository,
    @Inject(QUESTION_PROCESSOR_SERVICE)
    private readonly questionProcessorService: ClientProxy,
  ) {}

  async answer(answerTaskDto: AnswerTaskDto, creatorId: Types.ObjectId) {
    console.log(answerTaskDto, creatorId);
    await this.validateDto(answerTaskDto);
    return this.questionProcessorService
      .send('answered_task', answerTaskDto)
      .pipe(
        map((res) => {
          for (const answeredTask of res) {
            this.studentAnswerRepository.create(answeredTask);
          }
          // return 'Questions created successfully';
        }),
      );
  }
  private async validateDto(answerTaskDto: AnswerTaskDto) {
    try {
      await this.studentAnswerRepository.findOne({
        taskId: answerTaskDto.taskId,
      });
    } catch (err) {
      return;
    }
    throw new NotFoundException('This task does not exists.');
  }
  async findAll() {
    return await this.studentAnswerRepository.find({});
  }

  async findOne(id: number) {
    return await this.studentAnswerRepository.findOne({ _id: id });
  }

  async update(id: number, updateAnswerDto: any) {
    return await this.studentAnswerRepository.findOneAndUpdate(
      {
        _id: id,
      },
      updateAnswerDto,
    );
  }

  async remove(id: number) {
    return await this.studentAnswerRepository.findOneAndDelete({
      _id: id,
    });
  }
}
