import { QuestionDocument } from '../models/question.model';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;
  @IsString()
  description?: string;
  @IsString({ each: true })
  questions?: QuestionDocument[];
  @IsBoolean()
  isGraded: boolean;
  @IsNumber()
  totalScore?: number;
  @IsString()
  dueDate: string;
  @IsString()
  teacherId: string;
  @IsString()
  studentId: string;
}
