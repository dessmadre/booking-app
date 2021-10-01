import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateEventDto } from './dto/createEvent.dto';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get('/')
  async getEvents() {
    return this.eventService.getEvents();
  }

  @Get('/:id')
  async getEvent(@Param('id') id: Types.ObjectId) {
    return this.eventService.getEventById({ id });
  }

  @Post('/new')
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }
}
