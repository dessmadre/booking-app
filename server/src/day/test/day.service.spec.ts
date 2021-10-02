import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { HourService } from '../hour/hour.service';
import { DayService } from './day.service';
import { DaySchema } from './schema/day.schema';

it('can create an instance of day service', async () => {
  // create mock of the dayService
  // const fakeDayService = {
  //   seedDays: () => Promise.resolve([]),
  //   getDays: () => Promise.resolve([]),
  //   getDay: (id: number) =>
  //     Promise.resolve({
  //       _id: id,
  //       day: 'Monday',
  //       hours: [],
  //       isAvailable: false,
  //     }),
  // };

  const fakeHourService = {
    seedHours: () => Promise.resolve([]),
  };

  const module: TestingModule = await Test.createTestingModule({
    imports: [MongooseModule.forFeature([{ name: 'Day', schema: DaySchema }])],
    providers: [
      DayService,
      { provide: HourService, useValue: fakeHourService },
    ],
  }).compile();

  const dayService = module.get(DayService);

  expect(dayService).toBeDefined();
});
