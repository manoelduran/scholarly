import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class SchoolDocument extends AbstractDocument {}

export const SchoolSchema = SchemaFactory.createForClass(SchoolDocument);
