import { eventStub } from '../test/stubs/event.stub';

export const EventService = jest.fn().mockReturnValue({
  createEvent: jest.fn().mockResolvedValue(eventStub()),
  getEvent: jest.fn().mockResolvedValue(eventStub()),
  getEvents: jest.fn().mockResolvedValue([eventStub()]),
  deleteEvent: jest.fn().mockResolvedValue(true),
});
