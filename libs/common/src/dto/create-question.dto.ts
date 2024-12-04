import { IsString, IsEnum, IsArray } from 'class-validator';
import { Types } from 'mongoose';
import { DifficultyLevel, QuestionType } from './question.dto';

export class CreateQuestionDto {
  @IsString()
  header: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  options: string[];

  correctAnswer: string;

  @IsEnum(DifficultyLevel)
  difficulty: DifficultyLevel;

  @IsArray({ each: true })
  tags: string[];

  @IsString()
  creatorId: Types.ObjectId;
}
