import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DayModule } from './day/day.module';
import { EventModule } from './event/event.module';
import { HourModule } from './hour/hour.module';

@Module({
  imports: [DatabaseModule, DayModule, EventModule, HourModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
