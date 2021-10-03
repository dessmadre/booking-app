import { Test, TestingModule } from '@nestjs/testing';
import { DayService } from '../day.service';
import { Day } from '../schema/day.schema';
import { daysStub } from './stubs/days.stub';

jest.mock('../day.service');

describe('DayService', () => {
  let dayService: DayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DayService],
    }).compile();

    dayService = module.get<DayService>(DayService);
  });

  it('should be defined', () => {
    expect(dayService).toBeDefined();
  });

  describe('seedDays', () => {
    describe('when seedDays is called', () => {
      let days: Day[];
      beforeEach(async () => {
        days = await dayService.seedDays();
      });
      test('then it should call dayService', () => {
        expect(dayService.seedDays).toBeCalled();
      });
      test('then it should return an array of days', () => {
        expect(days).toEqual([daysStub()]);
      });
    });
  });

  describe('getDays', () => {
    describe('when getDays get called', () => {
      let days: Day[];
      beforeEach(async () => {
        days = await dayService.getDays();
      });
      test('then it should call the dayService', () => {
        expect(dayService.getDays).toBeCalled();
      });
      test('then it should return an array of days', () => {
        expect(days).toEqual([daysStub()]);
      });
    });
  });

  describe('getDay', () => {
    describe('when getDay is called', () => {
      let day: Day;
      beforeEach(async () => {
        day = await dayService.getDay(daysStub().id);
      });
      test('then it should call the dayService', () => {
        expect(dayService.getDay).toBeCalled();
      });
      test('then it should return a day', () => {
        expect(day).toEqual(daysStub());
      });
    });
  });

  describe('updateDayAvailTrue', () => {
    describe('when updateDayAvailTrue is called', () => {
      let day: Day;
      beforeEach(async () => {
        day = await dayService.updateDayAvailTrue(daysStub().id);
      });
      test('then it should call the dayService', () => {
        expect(dayService.updateDayAvailTrue).toBeCalled();
      });
      test('then it should return a day', () => {
        expect(day).toEqual(daysStub());
      });
    });
  });

  describe('updateDayAvailFalse', () => {
    describe('when updateDayAvailFalse is called', () => {
      let day: Day;
      beforeEach(async () => {
        day = await dayService.updateDayAvailFalse(daysStub().id);
      });
      test('then it should call the dayService', () => {
        expect(dayService.updateDayAvailFalse).toBeCalled();
      });
      test('then it should return a day', () => {
        expect(day).toEqual(daysStub());
      });
    });
  });
});
