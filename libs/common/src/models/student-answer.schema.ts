import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import { Types } from 'mongoose';
import { Answer } from '../dto/student-answer.dto';

@Schema({ versionKey: false })
export class StudentAnswerDocument extends AbstractDocument {
  @Prop({ required: true, type: Types.ObjectId, ref: 'TaskDocument' })
  taskId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'UserDocument' })
  studentId: Types.ObjectId;

  @Prop({
    required: true,
    type: [Answer],
  })
  answers: Answer[];

  @Prop({ required: false, type: Number })
  score?: number;

  @Prop({ required: true, default: false, type: Boolean })
  isSubmitted: boolean;
}

export const StudentAnswerSchema = SchemaFactory.createForClass(
  StudentAnswerDocument,
);
