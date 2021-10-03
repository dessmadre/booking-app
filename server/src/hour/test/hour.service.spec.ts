import { Test, TestingModule } from '@nestjs/testing';
import { HourService } from '../hour.service';
import { Hour } from '../schema/hour.schema';
import { hourStub } from './stubs/hour.stub';

jest.mock('../hour.service');

describe('HourService', () => {
  let hourService: HourService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HourService],
    }).compile();

    hourService = module.get<HourService>(HourService);
  });

  it('should be defined', () => {
    expect(hourService).toBeDefined();
  });

  describe('getHours', () => {
    describe('when getHours is called', () => {
      let hours: Hour[];
      beforeEach(async () => {
        hours = await hourService.getHours();
      });
      test('it should call the hourService', () => {
        expect(hourService.getHours).toBeCalled();
      });
      test('it should return an array of hours', () => {
        expect(hours).toEqual([hourStub()]);
      });
    });
  });

  describe('getHour', () => {
    describe('when getHour is called', () => {
      let hour: Hour;
      beforeEach(async () => {
        hour = await hourService.getHour(hourStub().id);
      });
      test('it should call the dayService', () => {
        expect(hourService.getHour).toBeCalled();
      });
      test('it should return a hour', () => {
        expect(hour).toEqual(hourStub());
      });
    });
  });

  describe('updateHourAvailTrue', () => {
    describe(' when updateHourAvailTrue is called', () => {
      let hour: Hour;
      beforeEach(async () => {
        hour = await hourService.updateHourAvailTrue(hourStub().id);
      });
      test('then it should call hourService', () => {
        expect(hourService.updateHourAvailTrue).toBeCalled();
      });
      test('then it should return a hour', () => {
        expect(hour).toEqual(hourStub());
      });
    });
  });

  describe('updateHourAvailFalse', () => {
    describe(' when updateHourAvailFalse is called', () => {
      let hour: Hour;
      beforeEach(async () => {
        hour = await hourService.updateHourAvailFalse(hourStub().id);
      });
      test('then it should call hourService', () => {
        expect(hourService.updateHourAvailFalse).toBeCalled();
      });
      test('then it should return a hour', () => {
        expect(hour).toEqual(hourStub());
      });
    });
  });
});
