import { IsString, IsNumber } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  text: string;
  @IsString()
  type: string;
  @IsString({ each: true })
  options?: string[];
  @IsString()
  correctAnswer?: string;
  @IsString()
  taskId: string;
  @IsNumber()
  score?: number;
  @IsString()
  difficulty?: string;
  @IsString({ each: true })
  tags?: string[];
  @IsString()
  teacherId: string;
}
