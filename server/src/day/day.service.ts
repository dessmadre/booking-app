import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateDayDto } from './dto/updateDay.dto';
import { Day } from './schema/day.schema';
import { HourService } from 'src/hour/hour.service';

@Injectable()
export class DayService {
  constructor(
    @InjectModel('Day') private dayModel: Model<Day>,
    private readonly hourService: HourService,
  ) {}

  async seedDays(): Promise<Day[]> {
    const days = await this.dayModel.find();

    if (days.length) {
      throw new BadRequestException();
    }

    for (let i = 0; i <= 6; i++) {
      if (i % 7 === 0) {
        const newDay = new this.dayModel({
          day: 'Sunday',
        });

        await newDay.save();
      }
      if (i % 7 === 1) {
        const newDay = new this.dayModel({
          day: 'Monday',
        });

        await newDay.save();
      }
      if (i % 7 === 2) {
        const newDay = new this.dayModel({
          day: 'Tuesday',
        });

        await newDay.save();
      }
      if (i % 7 === 3) {
        const newDay = new this.dayModel({
          day: 'Wednesday',
        });

        await newDay.save();
      }
      if (i % 7 === 4) {
        const newDay = new this.dayModel({
          day: 'Thursday',
        });

        await newDay.save();
      }
      if (i % 7 === 5) {
        const newDay = new this.dayModel({
          day: 'Friday',
        });

        await newDay.save();
      }
      if (i % 7 === 6) {
        const newDay = new this.dayModel({
          day: 'Saturday',
        });

        await newDay.save();
      }
    }
    this.hourService.seedHours();

    return this.dayModel.find();
  }

  async getDays(): Promise<Day[]> {
    return this.dayModel.find().populate('hours');
  }

  async getDay(updateDayDto: UpdateDayDto): Promise<Day> {
    const day = await this.dayModel.findById(updateDayDto.id).populate('hours');

    if (!day) {
      throw new BadRequestException();
    }

    return day;
  }

  async updateDayAvailTrue(updateDayDto: UpdateDayDto): Promise<Day> {
    const day = await this.dayModel.findById(updateDayDto.id);

    if (!day) {
      throw new BadRequestException();
    }

    day.isAvailable = true;

    await day.save();

    return day;
  }

  async updateDayAvailFalse(updateDayDto: UpdateDayDto): Promise<Day> {
    const day = await this.dayModel.findById(updateDayDto.id);

    if (!day) {
      throw new BadRequestException();
    }

    day.isAvailable = false;

    await day.save();

    return day;
  }

  async clearDayCollection() {
    return this.dayModel.remove();
  }
}
