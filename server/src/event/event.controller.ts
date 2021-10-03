import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateEventDto } from './dto/createEvent.dto';
import { EventService } from './event.service';
import { Event } from './schema/event.schema';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get('/')
  async getEvents(): Promise<Event[]> {
    return this.eventService.getEvents();
  }

  @Get('/:id')
  async getEvent(@Param('id') id: Types.ObjectId): Promise<Event> {
    return this.eventService.getEvent({ id });
  }

  @Post('/new')
  async createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventService.createEvent(createEventDto);
  }

  @Delete('/:id')
  async deleteEvent(@Param('id') id: Types.ObjectId): Promise<boolean> {
    return this.eventService.deleteEvent({ id });
  }
}
