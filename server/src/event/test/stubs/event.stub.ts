import { Event } from '../../schema/event.schema';

export const eventStub = () => {
  return {
    hour: '4:00 am',
    day: 12,
    month: 9,
    year: 1995,
    weekday: 'Tuesday',
    dateString: 'September 12',
  } as Event;
};
