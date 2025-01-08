import { Types } from 'mongoose';

export interface TaskDto {
  _id?: Types.ObjectId;

  title: string;

  instructions?: string;

  questions?: Types.ObjectId[];

  isGraded: boolean;

  dueDate?: Date;

  creatorId: Types.ObjectId;
}
