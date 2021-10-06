import { Event } from '../../schema/event.schema';

export const eventStub = () => {
  return {
    hourString: '4:00 am',
    hour: 4,
    day: 12,
    month: 9,
    year: 1995,
    weekday: 'Tuesday',
    dateString: 'September 12',
  } as Event;
};
