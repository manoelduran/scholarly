import { Types } from 'mongoose';

export class Answer {
  questionId: Types.ObjectId;
  answer: string;
  isCorrect?: boolean;
  score?: number;
}

export interface StudentAnswerDto {
  _id?: Types.ObjectId;

  totalScore?: number;

  answers: Answer[];

  isSubmitted: boolean;

  taskId: Types.ObjectId;

  studentId: Types.ObjectId;
}
