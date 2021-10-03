import { Test, TestingModule } from '@nestjs/testing';
import { HourController } from '../hour.controller';
import { HourService } from '../hour.service';
import { Hour } from '../schema/hour.schema';
import { hourStub } from './stubs/hour.stub';

jest.mock('../hour.service');

describe('HourController', () => {
  let hourController: HourController;
  let hourService: HourService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HourController],
      providers: [HourService],
    }).compile();

    hourController = module.get<HourController>(HourController);
    hourService = module.get<HourService>(HourService);
  });

  it('should be defined', () => {
    expect(hourController).toBeDefined();
  });

  describe('getHours', () => {
    describe('when getHours is called', () => {
      let hours: Hour[];
      beforeEach(async () => {
        hours = await hourController.getHours();
      });
      test('then it should call the hourService', () => {
        expect(hourService.getHours).toBeCalled();
      });
      test('then it should return an array of hours', () => {
        expect(hours).toEqual([hourStub()]);
      });
    });
  });

  describe('getHour', () => {
    describe('when getHour gets called', () => {
      let hour: Hour;
      beforeEach(async () => {
        hour = await hourController.getHour(hourStub().id);
      });
      test('then it should call the hourService', () => {
        expect(hourService.getHour).toBeCalled();
      });
      test('then it should return an hour', () => {
        expect(hour).toEqual(hourStub());
      });
    });
  });

  describe('updateHourAvailTrue', () => {
    describe('when updateHourAvailTrue is called', () => {
      let hour: Hour;
      beforeEach(async () => {
        hour = await hourService.updateHourAvailTrue(hourStub().id);
      });
      test('then it should call the hourService', () => {
        expect(hourService.updateHourAvailTrue).toBeCalled();
      });
      test('then it should return an hour', () => {
        expect(hour).toEqual(hourStub());
      });
    });
  });

  describe('updateHourAvailFalse', () => {
    describe('when updateHourAvailFalse is called', () => {
      let hour: Hour;
      beforeEach(async () => {
        hour = await hourService.updateHourAvailFalse(hourStub().id);
      });
      test('then it should call the hourService', () => {
        expect(hourService.updateHourAvailFalse).toBeCalled();
      });
      test('then it should return an hour', () => {
        expect(hour).toEqual(hourStub());
      });
    });
  });
});
