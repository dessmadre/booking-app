import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { Types } from 'mongoose';
import { HourService } from './hour.service';

@Controller('/hour')
export class HourController {
  constructor(private hourService: HourService) {}

  @Get('/')
  async getHours() {
    return this.hourService.getHours();
  }

  @Get('/:id')
  async getHour(@Param('id') id: Types.ObjectId) {
    return this.hourService.getHour({ id });
  }

  @Patch('/:id/true')
  async updateHourAvailTrue(@Param('id') id: Types.ObjectId) {
    return this.hourService.updateHourAvailTrue({ id });
  }

  @Patch('/:id/false')
  async updateHourAvailFalse(@Param('id') id: Types.ObjectId) {
    return this.hourService.updateHourAvailFalse({ id });
  }

  @Delete('/clear')
  async clearDayCollection() {
    return this.hourService.clearHourCollection();
  }
}
