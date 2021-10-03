import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';

import { AppModule } from '../../../app.module';
import { DatabaseService } from '../../../database/database.service';
import { hourStubIntegrated as hourStub } from '../stubs/hourIntegrated.stub';

describe('HourController (e2e)', () => {
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
    await dbConnection.collection('hours').deleteMany({});
  });

  describe('getHours', () => {
    it('should return an array or hours', async () => {
      await dbConnection.collection('hours').insertOne(hourStub());

      const response = await apiClient().get('/hour');

      expect(response.status).toBe(200);
    });
  });

  describe('getHour', () => {
    it('should return an hour', async () => {
      await dbConnection.collection('hours').insertOne(hourStub());

      const hours = await apiClient().get('/hour');

      const hourId = await hours.body[0]._id;

      const res = await apiClient().get(`/hour/${hourId}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ ...hourStub(), _id: hourId });
    });
  });

  describe('updateHourAvailTrue', () => {
    it('should return an hour and set its availability to true', async () => {
      await dbConnection.collection('hours').insertOne(hourStub());

      const hours = await apiClient().get('/hour');

      const hourId = await hours.body[0]._id;

      const response = await apiClient().patch(`/hour/${hourId}/true`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        ...hourStub(),
        _id: hourId,
        isAvailable: true,
      });
    });
  });

  describe('updateHourAvailFalse', () => {
    it('should return an hour and set its availablity to false', async () => {
      hourStub().isAvailable = true;
      await dbConnection.collection('hours').insertOne(hourStub());

      const hours = await apiClient().get('/hour');

      const hourId = await hours.body[0]._id;

      const response = await apiClient().patch(`/hour/${hourId}/false`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        ...hourStub(),
        _id: hourId,
        isAvailable: false,
      });
    });
  });
});
