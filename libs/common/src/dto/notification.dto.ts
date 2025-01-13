import { Types } from 'mongoose';

export enum SubjectEnum {
  'Answered Task' = 'Answered Task',
}

export interface NotificationDto {
  _id?: Types.ObjectId;

  message: string;

  subject: SubjectEnum;

  emittedBy: Types.ObjectId;
}
