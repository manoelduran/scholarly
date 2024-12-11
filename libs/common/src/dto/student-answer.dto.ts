import { Types } from 'mongoose';

export class Answer {
  questionId: Types.ObjectId;
  answer: string;
  isCorrect?: boolean;
}

export interface StudentAnswerDto {
  _id?: Types.ObjectId;

  score?: number;

  answers: Answer[];

  isSubmitted: boolean;

  taskId: Types.ObjectId;

  studentId: Types.ObjectId;
}
