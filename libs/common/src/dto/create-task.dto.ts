import { IsString, IsNumber, IsBoolean, IsDate } from 'class-validator';
import { Types } from 'mongoose';
import { QuestionDocument } from '../models';

export class CreateTaskDto {
  @IsString()
  title: string;
  @IsString()
  instructions?: string;
  @IsString({ each: true })
  questions?: QuestionDocument[];
  @IsBoolean()
  isGraded: boolean;
  @IsNumber()
  totalScore?: number;
  @IsDate()
  dueDate?: Date;
  @IsString()
  creatorId: Types.ObjectId;
  @IsString()
  studentId: Types.ObjectId;
}
