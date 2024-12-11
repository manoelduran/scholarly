import { IsObject, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Answer } from './student-answer.dto';

export class AnswerTaskDto {
  @IsString()
  taskId: Types.ObjectId;

  @IsObject({ each: true })
  answers: Answer[];
}
