import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument, QuestionDocument } from '@app/common';
import { Types } from 'mongoose';

@Schema({ versionKey: false })
export class TaskDocument extends AbstractDocument {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  instructions?: string;

  @Prop({ type: [Types.ObjectId], ref: 'QuestionDocument', required: false })
  questions?: QuestionDocument[];

  @Prop({ required: true, default: false, type: Boolean })
  isGraded: boolean;

  @Prop({ required: false, type: Date })
  dueDate?: Date;

  @Prop({ required: true, type: Types.ObjectId, ref: 'UserDocument' })
  creatorId: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(TaskDocument);
