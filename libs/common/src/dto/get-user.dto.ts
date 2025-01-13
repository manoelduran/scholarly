import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class GetUserDto {
  @IsString()
  @IsNotEmpty()
  _id: Types.ObjectId;
}
