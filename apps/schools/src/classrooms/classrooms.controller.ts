import { Controller, Post, Body, Param } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { Types } from 'mongoose';
import { CreateClassroomDto } from '@app/common';

@Controller('classrooms')
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @Post()
  async create(
    @Param() creatorId: Types.ObjectId,
    @Body() createClassroomDto: CreateClassroomDto,
  ) {
    return this.classroomsService.create(createClassroomDto, creatorId);
  }
}
