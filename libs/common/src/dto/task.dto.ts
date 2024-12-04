import { Types } from 'mongoose';
import { QuestionDocument } from '../models';

export interface TaskDto {
  _id?: Types.ObjectId;

  title: string;

  instructions?: string;

  questions?: QuestionDocument[];

  isGraded: boolean;

  totalScore?: number;

  dueDate?: Date;

  creatorId: Types.ObjectId;

  studentId: Types.ObjectId;
}
