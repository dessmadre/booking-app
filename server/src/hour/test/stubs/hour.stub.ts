import { Types } from 'mongoose';
import { Hour } from '../../schema/hour.schema';

const dayId = new Types.ObjectId(1231);

export const hourStub = () => {
  return {
    hour: '4:00 am',
    index: 4,
    day: dayId,
    isAvailable: false,
  } as Hour;
};
