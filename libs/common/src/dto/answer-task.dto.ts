import { IsObject } from 'class-validator';
import { Answer } from './student-answer.dto';

export class AnswerTaskDto {
  @IsObject({ each: true })
  answers: Answer[];
}
