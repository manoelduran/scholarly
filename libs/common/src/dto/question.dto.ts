import { Types } from 'mongoose';

export enum QuestionType {
  Subject = 'subject',
  Object = 'object',
}

export enum DifficultyLevel {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export interface QuestionDto {
  _id?: Types.ObjectId;
  header: string;
  type: QuestionType;
  options: string[];
  classGroup: string;
  correctAnswer: string;
  difficulty: DifficultyLevel;
  tags: string[];
  creatorId: Types.ObjectId;
}
