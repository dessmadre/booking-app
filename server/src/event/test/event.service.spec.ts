import { Test, TestingModule } from '@nestjs/testing';
import { CreateEventDto } from '../dto/createEvent.dto';
import { EventService } from '../event.service';
import { Event } from '../schema/event.schema';
import { eventStub } from './stubs/event.stub';

jest.mock('../event.service');

describe('EventService', () => {
  let eventService: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventService],
    }).compile();

    eventService = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(eventService).toBeDefined();
  });

  describe('createEvent', () => {
    describe('when createEvent is called', () => {
      let event: Event;
      let createEventDto: CreateEventDto;

      beforeEach(async () => {
        createEventDto = {
          hourString: eventStub().hourString,
          hour: eventStub().hour,
          day: eventStub().day,
          month: eventStub().month,
          year: eventStub().year,
          weekday: eventStub().weekday,
          dateString: eventStub().dateString,
        };

        event = await eventService.createEvent(createEventDto);
      });
      test('then it should call the eventService', () => {
        expect(eventService.createEvent).toHaveBeenCalledWith({
          hourString: createEventDto.hourString,
          hour: createEventDto.hour,
          day: createEventDto.day,
          month: createEventDto.month,
          year: createEventDto.year,
          weekday: createEventDto.weekday,
          dateString: createEventDto.dateString,
        });
      });
      test('then it should return an event', () => {
        expect(event).toEqual(eventStub());
      });
    });
  });

  describe('getEvent', () => {
    describe('when getEvent is called', () => {
      let event: Event;
      beforeEach(async () => {
        event = await eventService.getEvent(eventStub().id);
      });
      test('then it should call the eventService', () => {
        expect(eventService.getEvent).toBeCalled();
      });
      test('then it should return an event', () => {
        expect(event).toEqual(eventStub());
      });
    });
  });

  describe('getEvents', () => {
    describe('when getEvents is called', () => {
      let events: Event[];
      beforeEach(async () => {
        events = await eventService.getEvents();
      });
      test('then eventService should be called', () => {
        expect(eventService.getEvents).toBeCalled();
      });
      test('then it should return an array of events', () => {
        expect(events).toEqual([eventStub()]);
      });
    });
  });

  describe('deleteEvent', () => {
    describe('when deleteEvenet is called', () => {
      let hour: boolean;
      beforeEach(async () => {
        hour = await eventService.deleteEvent(eventStub().id);
      });
      test('then it should call the eventService', () => {
        expect(eventService.deleteEvent).toBeCalled();
      });
      test('then it should return true', () => {
        expect(hour).toEqual(true);
      });
    });
  });
});
