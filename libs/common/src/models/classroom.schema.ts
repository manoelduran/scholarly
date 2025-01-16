import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import { Types } from 'mongoose';

@Schema({ versionKey: false })
export class ClassroomDocument extends AbstractDocument {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  teacherId: Types.ObjectId;

  @Prop({ required: true, type: [Types.ObjectId], ref: 'User' })
  studentIds: Types.ObjectId[];
}

export const ClassroomSchema = SchemaFactory.createForClass(ClassroomDocument);
