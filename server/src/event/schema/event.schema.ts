import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop()
  hour: string;

  @Prop()
  weekday: string;

  @Prop()
  dateString: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
