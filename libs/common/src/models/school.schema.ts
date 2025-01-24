import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class SchoolDocument extends AbstractDocument {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;
}

export const SchoolSchema = SchemaFactory.createForClass(SchoolDocument);
