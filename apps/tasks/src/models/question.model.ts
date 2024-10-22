import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class QuestionDocument extends AbstractDocument {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: [String], required: false })
  options?: string[];

  @Prop({ required: false })
  correctAnswer?: string;

  @Prop({ required: true })
  taskId: string;

  @Prop({ required: false, default: 1 })
  score?: number;

  @Prop({ required: false })
  difficulty?: string;

  @Prop({ type: [String], required: false })
  tags?: string[];

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true })
  teacherId: string;
}

export const QuestionSchema = SchemaFactory.createForClass(QuestionDocument);
