import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument, RolesEnum } from '@app/common';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: [String], required: true, enum: RolesEnum })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
