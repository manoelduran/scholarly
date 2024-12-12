import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from '@app/common';
import { QuestionsRepository } from './questions/questions.repository';
import { Types } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly questionRepository: QuestionsRepository,
  ) {}
  async find() {
    return this.tasksRepository.find({});
  }
  async create(createTaskDto: CreateTaskDto, creatorId: Types.ObjectId) {
    const questions = await this.questionRepository.find({});
    const list = [];
    const matchedQuestions = questions.map((q) => {
      if (q.classGroup.includes(createTaskDto.title)) {
        list.push(q._id);
      }
    });
    console.log('matchedQuestions.length', matchedQuestions.length);
    if (!list.length) {
      throw new NotFoundException('No questions found for this task');
    }
    console.log('ok', list);
    return this.tasksRepository.create({
      ...createTaskDto,
      creatorId,
      questions: list,
    });
  }
}
