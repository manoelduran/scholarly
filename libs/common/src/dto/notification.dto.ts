import { Types } from 'mongoose';

export interface NotificationDto {
  _id?: Types.ObjectId;

  message: string;

  emittedBy: Types.ObjectId;
}
