import { Event } from '../../schema/event.schema';

export const eventStub = () => {
  return {
    id: 1,
    hour: '4:00 am',
    weekday: 'Tuesday',
    dateString: 'September 12',
  } as Event;
};
