import { IsString } from 'class-validator';

import { Types } from 'mongoose';

export class CreateClassroomDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  teacherId: Types.ObjectId;

  @IsString({ each: true })
  studentIds: Types.ObjectId[];
}
