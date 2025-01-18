import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import { Types } from 'mongoose';

@Schema({ versionKey: false })
export class SchoolDocument extends AbstractDocument {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true, type: [Types.ObjectId], ref: 'ClassroomDocument' })
  classroomIds: Types.ObjectId[];
}

export const SchoolSchema = SchemaFactory.createForClass(SchoolDocument);
