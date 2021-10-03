import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Day } from 'src/day/schema/day.schema';
import { UpdateHourDto } from './dto/updateHour.dto';
import { Hour } from './schema/hour.schema';

@Injectable()
export class HourService {
  constructor(
    @InjectModel('Hour') private hourModel: Model<Hour>,
    @InjectModel('Day') private dayModel: Model<Day>,
  ) {}

  async seedHours(): Promise<void> {
    const days = await this.dayModel.find();

    days.forEach(async (day: Day) => {
      console.log(day);

      for (let i = 0; i <= 23; i++) {
        const newHour = new this.hourModel({
          hour: `${i % 12 || (i === 0 && 12) || (i === 12 && 12)}:00 ${
            i <= 11 ? 'am' : 'pm'
          }`,
          day: day._id,
        });

        await newHour.save();
      }
      day.hours = await this.hourModel.find().where('day').equals(day._id);

      await day.save();
    });
  }

  async getHours(): Promise<Hour[]> {
    return this.hourModel.find();
  }

  async getHour(updateHourDto: UpdateHourDto): Promise<Hour> {
    const hour = await this.hourModel.findById(updateHourDto.id);

    if (!hour) {
      throw new BadRequestException();
    }

    return hour;
  }

  async updateHourAvailTrue(updateHourDto: UpdateHourDto): Promise<Hour> {
    const hour = await this.hourModel.findById(updateHourDto.id);

    if (!hour) {
      throw new BadRequestException();
    }

    hour.isAvailable = true;

    await hour.save();

    return hour;
  }

  async updateHourAvailFalse(updateHourDto: UpdateHourDto): Promise<Hour> {
    const hour = await this.hourModel.findById(updateHourDto.id);

    if (!hour) {
      throw new BadRequestException();
    }

    hour.isAvailable = false;

    await hour.save();

    return hour;
  }

  async clearHourCollection() {
    return this.hourModel.remove();
  }
}
