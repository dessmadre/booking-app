import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop()
  hour: string;

  @Prop()
  weekday: string;

  @Prop()
  day: number;

  @Prop()
  month: number;

  @Prop()
  year: number;

  @Prop()
  dateString: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
