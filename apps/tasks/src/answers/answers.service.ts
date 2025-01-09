import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  Answer,
  AnswerTaskDto,
  QUESTION_PROCESSOR_SERVICE,
  QuestionType,
} from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, map } from 'rxjs';
import { Types } from 'mongoose';
import { StudentAnswersRepository } from './answers.repository';
import { QuestionsRepository } from '../questions/questions.repository';
import { TasksRepository } from '../tasks.repository';

@Injectable()
export class StudentAnswerService {
  constructor(
    private readonly studentAnswerRepository: StudentAnswersRepository,
    private readonly questionRepository: QuestionsRepository,
    private readonly tasksRepository: TasksRepository,
    @Inject(QUESTION_PROCESSOR_SERVICE)
    private readonly questionProcessorService: ClientProxy,
  ) {}

  async answer(
    answerTaskDto: AnswerTaskDto,
    taskId: Types.ObjectId,
    creatorId: Types.ObjectId,
  ) {
    await this.validateDto(taskId, creatorId);

    // Index answers by questionId for O(1) lookup
    const answerMap = new Map(
      answerTaskDto.answers.map((a) => [a.questionId.toString(), a]),
    );
    console.log('answerMap', answerMap);

    const questions = await this.questionRepository.find({
      _id: { $in: Array.from(answerMap.keys()) },
    });
    console.log('questions', questions);
    const answers: Partial<Answer[]> = [];
    const discursiveAnswers: Record<
      string,
      { questionHeader: string; correctAnswer: string; studentAnswer: Answer }
    > = {};
    for (const question of questions) {
      const answer = answerMap.get(question._id.toString());
      if (!answer) continue;
      if (question.type === QuestionType.MultipleChoise) {
        const isCorrect = answer.answer === question.correctAnswer;
        answers.push({
          ...answer,
          isCorrect,
          score: isCorrect ? 1 : 0,
        });
      }
      if (question.type === QuestionType.Discursive) {
        discursiveAnswers[question._id.toString()] = {
          questionHeader: question.header,
          correctAnswer: question.correctAnswer,
          studentAnswer: answer,
        };
      }
    }

    if (Object.keys(discursiveAnswers).length > 0) {
      console.log('discursiveAnswers', discursiveAnswers);
      // Use firstValueFrom to handle the observable properly with async/await
      await firstValueFrom(
        this.questionProcessorService
          .send('answered_task', discursiveAnswers)
          .pipe(
            map((response) => {
              console.log('response from processor', response);
              answers.push(...response);
            }),
          ),
      );
    }
    console.log('answers', answers);
    const totalScore = answers.reduce((acc, curr) => acc + curr.score, 0);
    console.log('totalScore', totalScore);
    this.studentAnswerRepository.create({
      isSubmitted: true,
      taskId: taskId,
      studentId: creatorId,
      answers,
      totalScore,
    });
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
    throw new BadRequestException('Answer already submitted');
  }
  async findAll() {
    return await this.studentAnswerRepository.find({});
  }

  async findOne(id: string) {
    return await this.studentAnswerRepository.findOne({ _id: id });
  }

  async remove(id: string) {
    return await this.studentAnswerRepository.findOneAndDelete({
      _id: id,
    });
  }
}
