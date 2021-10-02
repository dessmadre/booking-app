import { Day } from '../../schema/day.schema';

export const daysStub = () => {
  return {
    id: 1,
    day: 'Monday',
    hours: [],
    isAvailable: false,
  } as Day;
};
