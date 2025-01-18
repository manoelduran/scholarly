import { IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateSchoolDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  directorId: Types.ObjectId;

  @IsString()
  creatorId: Types.ObjectId;

  @IsString({ each: true })
  classroomIds: Types.ObjectId[];
}
