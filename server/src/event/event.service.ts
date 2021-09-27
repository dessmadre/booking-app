import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';
import { Event } from './schema/event.schema';

@Injectable()
export class EventService {
  constructor(@InjectModel('Event') private eventModel: Model<Event>) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = new this.eventModel(createEventDto);

    await newEvent.save();

    return newEvent;
  }

  async getEventById(updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.eventModel.findById(updateEventDto.id);

    if (!event) {
      throw new BadRequestException();
    }

    return event;
  }

  async getEvents(): Promise<Event[]> {
    return this.eventModel.find();
  }

  async deleteEvent(updateEventDto: UpdateEventDto): Promise<boolean> {
    const event = await this.eventModel.findById(updateEventDto.id);

    if (!event) {
      throw new BadRequestException();
    }

    await event.delete();

    return true;
  }
}
