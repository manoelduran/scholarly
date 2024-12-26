import { Types } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateQuestionDto,
  JwtAuthGuard,
  QuestionDocument,
  QuestionType,
  UserDocument,
} from '@app/common';

import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { QuestionsRepository } from './questions.repository';

describe('QuestionsController', () => {
  let questionsController: QuestionsController;
  // let questionsService: QuestionsService;

  const user = {
    _id: new Types.ObjectId(),
    email: 'dasdsa@gmail.com',
    password: 'dasdsa',
    roles: ['teacher'],
  } as UserDocument;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [
        {
          provide: QuestionsService,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: QuestionsRepository,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            find: jest.fn(),
            findOneAndDelete: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile();

    questionsController = module.get<QuestionsController>(QuestionsController);
    // questionsService = module.get<QuestionsService>(QuestionsService);
  });

  describe('Questions', () => {
    it('should create questions after Ollama processor', async () => {
      const questionDto = {
        difficulty: 'easy',
        header: 'What is the capital of Brazil?',
        tags: ['geography'],
        type: QuestionType.Object,
      } as CreateQuestionDto;
      const questions = [
        {
          _id: new Types.ObjectId(),
          correctAnswer: 'Brasília',
          creatorId: user._id,
          difficulty: 'easy',
          header: 'What is the capital of Brazil?',
          type: 'multiple-choice',
          options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Curitiba'],
          tags: ['geography'],
        },
      ] as QuestionDocument[];
      // jest.spyOn(questionsService, 'create').mockReturnValue(questions);
      const result = await questionsController.create(questionDto, user);
      console.log('result', result);
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Types.ObjectId);
    });
    // it('should throw NotFoundException when no questions match the classGroup', async () => {
    //   const taskDto2 = {
    //     title: 'Nonexistent',
    //     isGraded: false,
    //   } as CreateTaskDto;

    //   const questions = [
    //     {
    //       _id: new Types.ObjectId(),
    //       correctAnswer: 'Brasília',
    //       creatorId: user._id,
    //       difficulty: 'easy',
    //       header: 'What is the capital of Brazil?',
    //       type: 'multiple-choice',
    //       options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Curitiba'],
    //       tags: ['geography'],
    //       classGroup: 'aloha',
    //     },
    //   ] as QuestionDocument[];
    //   const task = {
    //     ...taskDto2,
    //     _id: new Types.ObjectId(),
    //     creatorId: user._id,
    //     questions: [],
    //   };

    //   const list = [];

    //   questions.map((q) => {
    //     if (q.classGroup.includes(task.title)) {
    //       list.push(q._id);
    //     }
    //   });

    //   expect(list).toHaveLength(0);
    //   expect(
    //     jest
    //       .spyOn(tasksService, 'create')
    //       .mockRejectedValue(new NotFoundException()),
    //   );
    // });
    // it('should return a list of tasks', async () => {
    //   jest.spyOn(tasksService, 'find').mockResolvedValue([
    //     {
    //       title: 'Test Group',
    //       isGraded: false,
    //       _id: new Types.ObjectId(),
    //       creatorId: user._id,
    //     },
    //   ]);
    //   const result = await tasksController.list();

    //   expect(result).toBeDefined();
    //   expect(result).toHaveLength(1);
    // });
  });
});
