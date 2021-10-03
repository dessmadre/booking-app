import { Types } from 'mongoose';
import { Hour } from '../../schema/hour.schema';

const dayId = new Types.ObjectId(1231);

export const hourStub = () => {
  return {
    id: 1,
    hour: '4:00 am',
    day: dayId,
    isAvailable: false,
  } as Hour;
};
