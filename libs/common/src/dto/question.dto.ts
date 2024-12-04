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
  type: string;
  options: string[];
  correctAnswer: string;
  difficulty: string;
  tags: string[];
  creatorId: Types.ObjectId;
}
