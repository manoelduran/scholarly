import { Types } from 'mongoose';

export enum RolesEnum {
  Owner = 'owner',
  Director = 'director',
  Assistant = 'assistant',
  Teacher = 'teacher',
  Student = 'student',
}
export interface UserDto {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  roles?: RolesEnum[];
}
