import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { ClassroomsRepository } from './classrooms.repository';
import { CreateClassroomDto } from '@app/common';

@Injectable()
export class ClassroomsService {
  constructor(private readonly classroomsRepository: ClassroomsRepository) {}

  async create(
    createClassroomDto: CreateClassroomDto,
    creatorId: Types.ObjectId,
  ) {
    console.log(creatorId);
    return this.classroomsRepository.create(createClassroomDto);
  }
}
