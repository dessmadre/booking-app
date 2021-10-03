import { Module } from '@nestjs/common';
import { HourService } from './hour.service';
import { HourController } from './hour.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HourSchema } from './schema/hour.schema';
import { DaySchema } from '../day/schema/day.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Hour', schema: HourSchema }]),
    MongooseModule.forFeature([{ name: 'Day', schema: DaySchema }]),
  ],
  providers: [HourService],
  controllers: [HourController],
  exports: [HourService],
})
export class HourModule {}
