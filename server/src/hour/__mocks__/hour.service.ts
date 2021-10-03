import { hourStub } from '../test/stubs/hour.stub';

export const HourService = jest.fn().mockReturnValue({
  getHours: jest.fn().mockResolvedValue([hourStub()]),
  getHour: jest.fn().mockResolvedValue(hourStub()),
  updateHourAvailTrue: jest.fn().mockResolvedValue(hourStub()),
  updateHourAvailFalse: jest.fn().mockResolvedValue(hourStub()),
});
