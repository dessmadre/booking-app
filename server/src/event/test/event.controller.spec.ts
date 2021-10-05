import { Test, TestingModule } from '@nestjs/testing';
import { CreateEventDto } from '../dto/createEvent.dto';
import { EventController } from '../event.controller';
import { EventService } from '../event.service';
import { Event } from '../schema/event.schema';
import { eventStub } from './stubs/event.stub';

jest.mock('../event.service');

describe('EventController', () => {
  let eventController: EventController;
  let eventService: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [EventService],
    }).compile();

    eventController = module.get<EventController>(EventController);
    eventService = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(eventController).toBeDefined();
  });

  describe('createEvent', () => {
    describe('when createEvent is called', () => {
      let event: Event;
      let createEventDto: CreateEventDto;
      beforeEach(async () => {
        createEventDto = {
          hour: eventStub().hour,
          day: eventStub().day,
          month: eventStub().month,
          year: eventStub().year,
          weekday: eventStub().weekday,
          dateString: eventStub().dateString,
        };
        event = await eventController.createEvent(createEventDto);
      });
      test('then it should call the eventService', () => {
        expect(eventService.createEvent).toHaveBeenCalledWith({
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

  describe('getEvents', () => {
    describe('when getEvents is called', () => {
      let events: Event[];
      beforeEach(async () => {
        events = await eventController.getEvents();
      });
      test('then it should call the eventService', () => {
        expect(eventService.getEvents).toBeCalled();
      });
      test('then it should return an array of events', () => {
        expect(events).toEqual([eventStub()]);
      });
    });
  });

  describe('getEvent', () => {
    describe('when getEvent is called', () => {
      let event: Event;
      beforeEach(async () => {
        event = await eventController.getEvent(eventStub().id);
      });
      test('then it should call the eventService', () => {
        expect(eventService.getEvent).toBeCalled();
      });
      test('then it should return an event', () => {
        expect(event).toEqual(eventStub());
      });
    });
  });

  describe('createEvent', () => {
    describe('when createEvent is called', () => {
      let event: boolean;
      beforeEach(async () => {
        event = await eventController.deleteEvent(eventStub().id);
      });
      test('then it should call the eventService', () => {
        expect(eventService.deleteEvent).toBeCalled();
      });
      test('then it should return true', () => {
        expect(event).toEqual(true);
      });
    });
  });
});
