import { Module } from '@nestjs/common';
import { DayService } from './day.service';
import { DayController } from './day.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DaySchema } from './schema/day.schema';
import { HourModule } from '../hour/hour.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Day', schema: DaySchema }]),
    HourModule,
  ],
  providers: [DayService],
  controllers: [DayController],
  exports: [DayService],
})
export class DayModule {}
