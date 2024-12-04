import { IsString, IsEnum, IsArray } from 'class-validator';
import { Types } from 'mongoose';
import { DifficultyLevel, QuestionType } from './question.dto';

export class CreateQuestionDto {
  @IsString()
  header: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsArray()
  options: string[];

  @IsString()
  correctAnswer: string;

  @IsEnum(DifficultyLevel)
  difficulty: DifficultyLevel;

  @IsString({ each: true })
  tags: string[];

  @IsString()
  creatorId: Types.ObjectId;
}
