import { Types } from 'mongoose';

export interface TaskDto {
  _id?: Types.ObjectId;

  title: string;

  instructions?: string;

  questions?: Types.ObjectId[];

  isGraded: boolean;

  totalScore?: number;

  dueDate?: Date;

  creatorId: Types.ObjectId;
}
