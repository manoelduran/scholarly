import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { Question } from './question.dto';

export class CreateTaskDto {
  @IsString()
  title: string;
  @IsString()
  description?: string;
  @IsString({ each: true })
  questions?: Question[];
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
