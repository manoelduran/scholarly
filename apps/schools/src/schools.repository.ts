import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository, SchoolDocument } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SchoolsRepository extends AbstractRepository<SchoolDocument> {
  protected readonly logger = new Logger(SchoolsRepository.name);

  constructor(
    @InjectModel(SchoolDocument.name)
    schoolModel: Model<SchoolDocument>,
  ) {
    super(schoolModel);
  }
}
