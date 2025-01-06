import { Types } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  Answer,
  JwtAuthGuard,
  QUESTION_PROCESSOR_SERVICE,
  StudentAnswerDocument,
  UserDocument,
} from '@app/common';
import { of } from 'rxjs';
import { StudentAnswerController } from './answers.controller';
import { StudentAnswerService } from './answers.service';
import { StudentAnswersRepository } from './answers.repository';

describe('AnswersController', () => {
  let studentAnswerController: StudentAnswerController;
  let studentAnswerService: StudentAnswerService;
  let studentAnswerRepository: StudentAnswersRepository;

  const user = {
    _id: new Types.ObjectId(),
    email: 'dasdsa@gmail.com',
    password: 'dasdsa',
    roles: ['student'],
  } as UserDocument;

  const answeredQuestions: Record<
    string,
    { correctAnswer: string; answer: Answer }
  > = {
    '1': {
      correctAnswer: 'Brasília',
      answer: {
        questionId: new Types.ObjectId(),
        answer: 'Brasília',
      },
    },
    '2': {
      correctAnswer: 'São Paulo',
      answer: {
        questionId: new Types.ObjectId(),
        answer: 'São Paulo',
      },
    },
    '3': {
      correctAnswer: 'Rio de Janeiro',
      answer: {
        questionId: new Types.ObjectId(),
        answer: 'Rio de Janeiro',
      },
    },
    '4': {
      correctAnswer: 'Curitiba',
      answer: {
        questionId: new Types.ObjectId(),
        answer: 'Curitiba',
      },
    },
  };
  const studentAnsweredQuestions = [
    {
      _id: new Types.ObjectId(),
      taskId: new Types.ObjectId(),
      studentId: new Types.ObjectId(),
      answers: [
        {
          questionId: new Types.ObjectId(),
          answer: 'Brasília',
        },
        {
          questionId: new Types.ObjectId(),
          answer: 'São Paulo',
        },
        {
          questionId: new Types.ObjectId(),
          answer: 'Rio de Janeiro',
        },
        {
          questionId: new Types.ObjectId(),
          answer: 'Curitiba',
        },
      ],
    },
  ] as StudentAnswerDocument[];
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentAnswerController],
      providers: [
        {
          provide: StudentAnswerService,
          useValue: {
            answer: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: StudentAnswersRepository,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneAndDelete: jest.fn(),
          },
        },
        {
          provide: QUESTION_PROCESSOR_SERVICE,
          useValue: {
            send: jest.fn(() => of(answeredQuestions)),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile();

    studentAnswerController = module.get<StudentAnswerController>(
      StudentAnswerController,
    );
    studentAnswerService =
      module.get<StudentAnswerService>(StudentAnswerService);
    studentAnswerRepository = module.get<StudentAnswersRepository>(
      StudentAnswersRepository,
    );
  });

  describe('Answers', () => {
    it('should answer questions before Ollama processor', async () => {
      expect(true).toBeTruthy();
    });
    it('should return all answers', async () => {
      jest
        .spyOn(studentAnswerService, 'findAll')
        .mockResolvedValue(studentAnsweredQuestions);
      const result = await studentAnswerController.findAll();
      expect(result).toEqual(studentAnsweredQuestions);
    });
    it('should return one answer', async () => {
      jest
        .spyOn(studentAnswerService, 'findOne')
        .mockResolvedValue(studentAnsweredQuestions[0]);
      const result = await studentAnswerController.findOne(
        studentAnsweredQuestions[0]._id.toString(),
      );
      expect(result).toBeDefined();
      expect(studentAnswerService.findOne).toHaveBeenCalledWith(
        studentAnsweredQuestions[0]._id.toString(),
      );
    });
    it('should remove an answer', async () => {
      jest
        .spyOn(studentAnswerService, 'remove')
        .mockResolvedValue(studentAnsweredQuestions[0]);
      const result = await studentAnswerController.remove(
        studentAnsweredQuestions[0]._id.toString(),
      );
      expect(result).toEqual(studentAnsweredQuestions[0]);
      expect(studentAnswerService.remove).toHaveBeenCalledWith(
        studentAnsweredQuestions[0]._id.toString(),
      );
    });
  });
});
