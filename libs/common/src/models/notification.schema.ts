import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import { Types } from 'mongoose';

@Schema({ versionKey: false })
export class NotificationDocument extends AbstractDocument {
  @Prop({ required: true, type: String })
  message: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  emittedBy: Types.ObjectId;
}

export const NotificationSchema =
  SchemaFactory.createForClass(NotificationDocument);
