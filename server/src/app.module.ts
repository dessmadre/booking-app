import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DayModule } from './day/day.module';
import { EventModule } from './event/event.module';
import { HourModule } from './hour/hour.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: `mongodb://${config.get<string>('MONGO_DB')}:27017`,
      }),
    }),

    DayModule,
    EventModule,
    HourModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
