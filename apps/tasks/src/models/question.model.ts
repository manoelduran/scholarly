import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class QuestionDocument extends AbstractDocument {
  @Prop()
  text: string;

  @Prop()
  type: string;

  @Prop()
  options?: string[];

  @Prop()
  correctAnswer?: string;

  @Prop()
  taskId: string;

  @Prop()
  score?: number;

  @Prop()
  difficulty?: string;

  @Prop()
  tags?: string[];

  @Prop()
  teacherId: string;
}

export const QuestionSchema = SchemaFactory.createForClass(QuestionDocument);
