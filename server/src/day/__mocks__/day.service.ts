import { daysStub } from '../test/stubs/days.stub';

export const DayService = jest.fn().mockReturnValue({
  seedDays: jest.fn().mockResolvedValue([daysStub()]),
  getDays: jest.fn().mockResolvedValue([daysStub()]),
  getDay: jest.fn().mockResolvedValue(daysStub()),
  updateDayAvailTrue: jest.fn().mockResolvedValue(daysStub()),
  updateDayAvailFalse: jest.fn().mockResolvedValue(daysStub()),
});
