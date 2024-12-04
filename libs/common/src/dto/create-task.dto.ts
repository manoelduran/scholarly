import { IsString, IsNumber, IsBoolean, IsDate } from 'class-validator';
import { Types } from 'mongoose';
import { QuestionDocument } from '../models';
import { Type } from 'class-transformer';

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
  @Type(() => Date)
  dueDate?: Date;
  @IsString()
  creatorId: Types.ObjectId;
  @IsString()
  studentId: Types.ObjectId;
}
