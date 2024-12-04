import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository, QuestionDocument } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class QuestionsRepository extends AbstractRepository<QuestionDocument> {
  protected readonly logger = new Logger(QuestionsRepository.name);

  constructor(
    @InjectModel(QuestionDocument.name) questionModel: Model<QuestionDocument>,
  ) {
    super(questionModel);
  }
}
