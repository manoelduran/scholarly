import { Test, TestingModule } from '@nestjs/testing';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { Types } from 'mongoose';
import { CreateSchoolDto, UserDocument } from '@app/common';

describe('SchoolsController', () => {
  let schoolsController: SchoolsController;
  const user = {
    _id: new Types.ObjectId(),
    email: 'dasdsa@gmail.com',
    password: 'dasdsa',
    roles: ['teacher'],
  } as UserDocument;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SchoolsController],
      providers: [SchoolsService],
    }).compile();

    schoolsController = app.get<SchoolsController>(SchoolsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const createSchoolDto: CreateSchoolDto = {
        name: 'School',
        address: 'Address',
        city: 'City',
      };
      expect(schoolsController.create(user, createSchoolDto)).toBe(
        'Hello World!',
      );
    });
  });
});
