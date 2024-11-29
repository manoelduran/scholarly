import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class TaskProcessorDocument extends AbstractDocument {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false })
  dueDate?: string;

  @Prop({ required: true })
  teacherId: string;
}

export const TaskProcessorSchema = SchemaFactory.createForClass(
  TaskProcessorDocument,
);
