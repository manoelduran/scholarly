import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import { QuestionDocument, QuestionSchema } from './question.model';

@Schema({ versionKey: false })
export class TaskDocument extends AbstractDocument {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ type: [QuestionSchema], required: false })
  questions?: QuestionDocument[];

  @Prop({ required: true, default: false })
  isGraded: boolean;

  @Prop({ required: false })
  totalScore?: number;

  @Prop({ required: false })
  dueDate?: string;

  @Prop({ required: true })
  teacherId: string;

  @Prop({ required: true })
  studentId: string;
}

export const TaskSchema = SchemaFactory.createForClass(TaskDocument);
