import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DayModule } from './day/day.module';
import { EventModule } from './event/event.module';
import { HourModule } from './hour/hour.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    DayModule,
    EventModule,
    HourModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
