import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Hour } from '../../hour/schema/hour.schema';

@Schema()
export class Day extends Document {
  @Prop()
  day: string;

  @Prop({ type: [Types.ObjectId], ref: 'Hour' })
  hours: Hour[];

  @Prop({ default: false })
  isAvailable: boolean;
}

export const DaySchema = SchemaFactory.createForClass(Day);
