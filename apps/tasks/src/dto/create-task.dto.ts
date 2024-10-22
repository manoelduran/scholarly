import { QuestionDocument } from '../models/question.model';

export class CreateTaskDto {
  title: string;
  description?: string;
  questions?: QuestionDocument[];
  isGraded: boolean;
  totalScore?: number;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  teacherId: string;
  studentId: string;
}
