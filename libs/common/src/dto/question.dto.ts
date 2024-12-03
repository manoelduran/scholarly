export interface Question {
  text: string;
  type: string;
  options?: string[];
  correctAnswer?: string;
  taskId: string;
  score?: number;
  difficulty?: string;
  tags?: string[];
  teacherId: string;
}
