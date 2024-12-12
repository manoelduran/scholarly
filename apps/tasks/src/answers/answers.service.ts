import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Answer, AnswerTaskDto, QUESTION_PROCESSOR_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { Types } from 'mongoose';
import { StudentAnswersRepository } from './answers.repository';
import { QuestionsRepository } from '../questions/questions.repository';

@Injectable()
export class StudentAnswerService {
  constructor(
    private readonly studentAnswerRepository: StudentAnswersRepository,
    private readonly questionRepository: QuestionsRepository,
    @Inject(QUESTION_PROCESSOR_SERVICE)
    private readonly questionProcessorService: ClientProxy,
  ) {}

  async answer(
    answerTaskDto: AnswerTaskDto,
    taskId: Types.ObjectId,
    creatorId: Types.ObjectId,
  ) {
    await this.validateDto(taskId, creatorId);

    const questions = await this.questionRepository.find({
      _id: { $in: answerTaskDto.answers.map((a) => a.questionId) },
    });

    const answeredQuestions: Record<
      string,
      { correctAnswer: string; answer: Answer }
    > = {};
    for (const question of questions) {
      const answer = answerTaskDto.answers.find(
        (a) => a.questionId.toString() === question._id.toString(),
      );

      answeredQuestions[question._id.toString()] = {
        correctAnswer: question.correctAnswer,
        answer: answer,
      };
    }

    return this.questionProcessorService
      .send('answered_task', answeredQuestions)
      .pipe(
        map((res) => {
          console.log('res', res);
          // for (const answeredTask of res) {
          // this.studentAnswerRepository.create(answeredTask);
          // }
          // return 'Questions created successfully';
        }),
      );
  }
  private async validateDto(taskId: Types.ObjectId, creatorId: Types.ObjectId) {
    try {
      await this.studentAnswerRepository.findOne({
        taskId: taskId,
        studentId: creatorId,
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
