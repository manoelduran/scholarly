import { Test, TestingModule } from '@nestjs/testing';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';

describe('SchoolsController', () => {
  let schoolsController: SchoolsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SchoolsController],
      providers: [SchoolsService],
    }).compile();

    schoolsController = app.get<SchoolsController>(SchoolsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(schoolsController.getHello()).toBe('Hello World!');
    });
  });
});
