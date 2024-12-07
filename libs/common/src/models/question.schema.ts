import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument, DifficultyLevel, QuestionType } from '@app/common';
import { Types } from 'mongoose';

@Schema({ versionKey: false })
export class QuestionDocument extends AbstractDocument {
  @Prop({ required: true, unique: true, type: String })
  header: string;

  @Prop({ required: true, enum: QuestionType })
  type: string;

  @Prop({
    type: [String],
  })
  options?: string[];

  @Prop({
    type: String,
  })
  correctAnswer: string;

  @Prop({ required: true, enum: DifficultyLevel })
  difficulty: string;

  @Prop({ required: false, type: [String] })
  tags?: string[];

  @Prop({ required: true, type: Types.ObjectId, ref: 'Teacher' })
  creatorId: Types.ObjectId;
}

export const QuestionSchema = SchemaFactory.createForClass(QuestionDocument);
