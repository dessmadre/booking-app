import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Hour extends Document {
  @Prop()
  hour: string;

  @Prop({ type: Types.ObjectId, ref: 'Day' })
  day: Types.ObjectId;

  @Prop({ default: false })
  isAvailable: boolean;

  @Prop({ default: false })
  isBooked: boolean;
}

export const HourSchema = SchemaFactory.createForClass(Hour);
