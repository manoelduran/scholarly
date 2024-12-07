import { IsString, IsEnum } from 'class-validator';
import { Types } from 'mongoose';
import { DifficultyLevel, QuestionType } from './question.dto';

export class CreateQuestionDto {
  @IsString()
  header: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsEnum(DifficultyLevel)
  difficulty: DifficultyLevel;

  @IsString({ each: true })
  tags: string[];

  @IsString()
  creatorId: Types.ObjectId;
}
