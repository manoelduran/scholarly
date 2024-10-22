export class CreateQuestionDto {
  text: string;
  type: string;
  options?: string[];
  correctAnswer?: string;
  taskId: string;
  score?: number;
  difficulty?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  teacherId: string;
}
