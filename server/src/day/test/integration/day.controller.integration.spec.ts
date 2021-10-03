import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { INestApplication } from '@nestjs/common';

import { DatabaseService } from '../../../database/database.service';
import { AppModule } from '../../../app.module';
import { daysStub } from '../stubs/days.stub';

describe('DayController (e2e)', () => {
  let dbConnection: Connection;
  let app: INestApplication;

  const apiClient = () => {
    return request(app.getHttpServer());
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    dbConnection = module.get<DatabaseService>(DatabaseService).getDbHandle();
    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('days').deleteMany({});
  });

  describe('getDays', () => {
    it('should return an array of days', async () => {
      await dbConnection.collection('days').insertOne(daysStub());

      const response = await apiClient().get('/day');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { ...daysStub(), _id: response.body[0]._id },
      ]);
    });
  });

  describe('getDay', () => {
    it('should return a day', async () => {
      await dbConnection.collection('days').insertOne(daysStub());

      const getDays = await apiClient().get('/day');

      const dayId = getDays.body[0]._id;

      const response = await apiClient().get(`/day/${dayId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ ...daysStub(), _id: dayId });
    });
  });

  describe('updateAvailTrue', () => {
    it('should return a day and update its availablity to true', async () => {
      await dbConnection.collection('days').insertOne(daysStub());

      const getDays = await apiClient().get('/day');

      const dayId = getDays.body[0]._id;

      const response = await apiClient().patch(`/day/${dayId}/true`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        ...daysStub(),
        _id: dayId,
        isAvailable: true,
      });
    });
  });

  describe('updateAvailFalse', () => {
    it('should return a day and update it availablity to false', async () => {
      daysStub().isAvailable = true;

      await dbConnection.collection('days').insertOne(daysStub());

      const getDays = await apiClient().get('/day');

      const dayId = getDays.body[0]._id;

      const response = await apiClient().patch(`/day/${dayId}/false`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        ...daysStub(),
        _id: dayId,
        isAvailable: false,
      });
    });
  });
});
