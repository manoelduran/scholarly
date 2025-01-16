import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository, ClassroomDocument } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ClassroomsRepository extends AbstractRepository<ClassroomDocument> {
  protected readonly logger = new Logger(ClassroomsRepository.name);

  constructor(
    @InjectModel(ClassroomDocument.name)
    classroomModel: Model<ClassroomDocument>,
  ) {
    super(classroomModel);
  }
}
