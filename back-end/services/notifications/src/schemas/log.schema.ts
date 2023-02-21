import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogDocument = HydratedDocument<Log>;

@Schema({
  timestamps: true,
})
export class Log {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  category: string;

  @Prop()
  channel: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
