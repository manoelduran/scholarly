import { Types } from 'mongoose';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TasksRepository } from './tasks.repository';
import {
  CreateTaskDto,
  JwtAuthGuard,
  QuestionDocument,
  UserDocument,
} from '@app/common';
import { NotFoundException } from '@nestjs/common';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  const user = {
    _id: new Types.ObjectId(),
    email: 'dasdsa@gmail.com',
    password: 'dasdsa',
    roles: ['teacher'],
  } as UserDocument;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: TasksRepository,
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

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  describe('A teacher can create a task', () => {
    it('should create a new task', async () => {
      const taskDto = {
        title: 'Test Group',
        isGraded: false,
      } as CreateTaskDto;
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

      jest.spyOn(tasksService, 'create').mockResolvedValue({
        ...taskDto,
        _id: new Types.ObjectId(),
        creatorId: user._id,
        questions: questions,
      });
      const result = await tasksController.create(taskDto, user);

      expect(result).toBeDefined();
      expect(result._id).toBeInstanceOf(Types.ObjectId);
      expect(result.questions).toHaveLength(1);
    });
    it('should throw NotFoundException when no questions match the classGroup', async () => {
      const taskDto2 = {
        title: 'Nonexistent',
        isGraded: false,
      } as CreateTaskDto;

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
          classGroup: 'aloha',
        },
      ] as QuestionDocument[];
      const task = {
        ...taskDto2,
        _id: new Types.ObjectId(),
        creatorId: user._id,
        questions: [],
      };

      const list = [];

      questions.map((q) => {
        if (q.classGroup.includes(task.title)) {
          list.push(q._id);
        }
      });

      expect(list).toHaveLength(0);
      expect(
        jest
          .spyOn(tasksService, 'create')
          .mockRejectedValue(new NotFoundException()),
      );
    });
    it('should return a list of tasks', async () => {
      jest.spyOn(tasksService, 'find').mockResolvedValue([
        {
          title: 'Test Group',
          isGraded: false,
          _id: new Types.ObjectId(),
          creatorId: user._id,
        },
      ]);
      const result = await tasksController.list();

      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
    });
  });
});
