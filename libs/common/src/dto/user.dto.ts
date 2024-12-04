import { Types } from 'mongoose';

export interface UserDto {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  roles?: string[];
}
