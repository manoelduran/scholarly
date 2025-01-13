import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument, SubjectEnum } from '@app/common';

@Schema({ versionKey: false })
export class NotificationDocument extends AbstractDocument {
  @Prop({ required: true, type: String })
  message: string;

  @Prop({ required: true, enum: SubjectEnum })
  subject: string;

  @Prop({ required: true, type: String })
  emittedBy: string;
}

export const NotificationSchema =
  SchemaFactory.createForClass(NotificationDocument);
