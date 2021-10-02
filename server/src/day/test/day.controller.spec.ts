import { Test, TestingModule } from '@nestjs/testing';
import { DayController } from '../day.controller';
import { DayService } from '../day.service';
import { Day } from '../schema/day.schema';
import { daysStub } from './stubs/days.stub';

jest.mock('../day.service.ts');

describe('DayController', () => {
  let dayController: DayController;
  let dayService: DayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DayController],
      providers: [DayService],
    }).compile();

    dayController = module.get<DayController>(DayController);
    dayService = module.get<DayService>(DayService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(dayController).toBeDefined();
  });

  describe('seedDays', () => {
    describe('when seedDays is called', () => {
      let days: Day[];
      beforeEach(async () => {
        days = await dayController.seedDays();
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
    describe('when getDays is called', () => {
      let days: Day[];
      beforeEach(async () => {
        days = await dayController.getDays();
      });
      test('then it should call dayService', () => {
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
        day = await dayController.getDay(daysStub().id);
      });
      test('then it should call dayService', () => {
        expect(dayService.getDay).toBeCalled();
      });
      test('then it should return a day', () => {
        expect(day).toEqual(daysStub());
      });
    });
  });

  describe('updateAvailTrue', () => {
    describe('when updateAvailTrue is called', () => {
      let day: Day;
      beforeEach(async () => {
        day = await dayController.updateAvailTrue(daysStub().id);
      });
      test('then it should call dayService', () => {
        expect(dayService.updateDayAvailTrue).toBeCalled();
      });
      test('then is should return a day', () => {
        expect(day).toEqual(daysStub());
      });
    });
  });

  describe('updateAvailFalse', () => {
    describe('when updateAvailFalse is called', () => {
      let day: Day;
      beforeEach(async () => {
        day = await dayController.updateAvailFalse(daysStub().id);
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
