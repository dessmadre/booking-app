import { Hour } from '../../schema/hour.schema';

export const hourStubIntegrated = () => {
  return {
    id: 1,
    hour: '4:00 am',
    isAvailable: false,
  } as Hour;
};
