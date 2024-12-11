import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentAnswerDocument } from '@app/common/models/student-answer.schema';

@Injectable()
export class StudentAnswersRepository extends AbstractRepository<StudentAnswerDocument> {
  protected readonly logger = new Logger(StudentAnswersRepository.name);

  constructor(
    @InjectModel(StudentAnswerDocument.name)
    studentAnswerModel: Model<StudentAnswerDocument>,
  ) {
    super(studentAnswerModel);
  }
}
