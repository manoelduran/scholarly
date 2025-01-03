import { Types } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateQuestionDto,
  JwtAuthGuard,
  QUESTION_PROCESSOR_SERVICE,
  QuestionDocument,
  QuestionType,
  UserDocument,
} from '@app/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { QuestionsRepository } from './questions.repository';
import { map, of } from 'rxjs';

describe('QuestionsController', () => {
  let questionsController: QuestionsController;
  let questionsService: QuestionsService;
  let questionsRepository: QuestionsRepository;

  const user = {
    _id: new Types.ObjectId(),
    email: 'dasdsa@gmail.com',
    password: 'dasdsa',
    roles: ['teacher'],
  } as UserDocument;
  const questions = [
    {
      _id: new Types.ObjectId(),
      correctAnswer: 'Brasília',
      creatorId: user._id,
      difficulty: 'easy',
      header: 'What is the capital of Brazil?',
      type: QuestionType.Object,
      options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Curitiba'],
      tags: ['geography'],
    },
    {
      _id: new Types.ObjectId(),
      correctAnswer: 'Brasília',
      creatorId: user._id,
      difficulty: 'easy',
      header: 'What is the capital of Brazil?',
      type: QuestionType.Object,
      options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Curitiba'],
      tags: ['geography'],
    },
    {
      _id: new Types.ObjectId(),
      correctAnswer: 'Brasília',
      creatorId: user._id,
      difficulty: 'easy',
      header: 'What is the capital of Brazil?',
      type: QuestionType.Object,
      options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Curitiba'],
      tags: ['geography'],
    },
    {
      _id: new Types.ObjectId(),
      correctAnswer: 'Brasília',
      creatorId: user._id,
      difficulty: 'easy',
      header: 'What is the capital of Brazil?',
      type: QuestionType.Object,
      options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Curitiba'],
      tags: ['geography'],
    },
    {
      _id: new Types.ObjectId(),
      correctAnswer: 'Brasília',
      creatorId: user._id,
      difficulty: 'easy',
      header: 'What is the capital of Brazil?',
      type: QuestionType.Object,
      options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Curitiba'],
      tags: ['geography'],
    },
    {
      _id: new Types.ObjectId(),
      correctAnswer: 'Brasília',
      creatorId: user._id,
      difficulty: 'easy',
      header: 'What is the capital of Brazil?',
      type: QuestionType.Object,
      options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Curitiba'],
      tags: ['geography'],
    },
    {
      _id: new Types.ObjectId(),
      correctAnswer: 'Brasília',
      creatorId: user._id,
      difficulty: 'easy',
      header: 'What is the capital of Brazil?',
      type: QuestionType.Object,
      options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Curitiba'],
      tags: ['geography'],
    },
  ] as QuestionDocument[];
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [
        {
          provide: QuestionsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: QuestionsRepository,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: QUESTION_PROCESSOR_SERVICE,
          useValue: {
            send: jest.fn(() => of(questions)),
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
    questionsService = module.get<QuestionsService>(QuestionsService);
    questionsRepository = module.get<QuestionsRepository>(QuestionsRepository);
  });

  describe('Questions', () => {
    it('should create questions after Ollama processor', async () => {
      const questionDto = {
        difficulty: 'easy',
        header: 'What is the capital of Brazil?',
        tags: ['geography'],
        type: QuestionType.Object,
      } as CreateQuestionDto;

      jest.spyOn(questionsService, 'create').mockResolvedValue(
        of(questions).pipe(
          map((res) => {
            for (const question of res) {
              questionsRepository.create({
                header: question.header,
                classGroup: question.classGroup,
                type: question.type,
                options: question.options,
                correctAnswer: question.correctAnswer,
                difficulty: question.difficulty,
                tags: question.tags,
                creatorId: question.creatorId,
              });
            }
          }),
        ),
      );
      const result = await questionsController.create(questionDto, user);
      result.subscribe();

      expect(result).toBeDefined();
      expect(questionsService.create).toHaveBeenCalledWith(
        questionDto,
        user._id,
      );
      expect(questionsRepository.create).toHaveBeenCalledTimes(7);
    });
    it('should return all questions', async () => {
      jest.spyOn(questionsService, 'findAll').mockResolvedValue(questions);
      const result = await questionsController.findAll();
      expect(result).toEqual(questions);
    });
    it('should return one question', async () => {
      jest.spyOn(questionsService, 'findOne').mockResolvedValue(questions[0]);
      const result = await questionsController.findOne(
        questions[0]._id.toString(),
      );
      expect(result).toBeDefined();
      expect(questionsService.findOne).toHaveBeenCalledWith(
        questions[0]._id.toString(),
      );
    });
  });
});
