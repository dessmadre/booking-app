import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';

import { AppModule } from '../../../app.module';
import * as request from 'supertest';
import { DatabaseService } from '../../../database/database.service';
import { eventStub } from '../stubs/event.stub';
import { CreateEventDto } from '../../dto/createEvent.dto';

describe('EventController (e2e)', () => {
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
    await dbConnection.collection('events').deleteMany({});
  });

  describe('getEvents', () => {
    it('returns an array or events', async () => {
      await dbConnection.collection('events').insertOne(eventStub());

      const response = await apiClient().get('/event');

      const eventId = response.body[0]._id;

      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ ...eventStub(), _id: eventId }]);
    });
  });

  describe('getEvent', () => {
    it('returns an event', async () => {
      await dbConnection.collection('events').insertOne(eventStub());

      const events = await apiClient().get('/event');

      const eventId = events.body[0]._id;

      const res = await apiClient().get(`/event/${eventId}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ ...eventStub(), _id: eventId });
    });
  });

  describe('createEvent', () => {
    it('creates an event', async () => {
      const createEventDto = {
        hour: eventStub().hour,
        day: eventStub().day,
        month: eventStub().month,
        year: eventStub().year,
        weekday: eventStub().weekday,
        dateString: eventStub().dateString,
      };

      const res = await apiClient().post('/event/new').send(createEventDto);

      const eventId = res.body._id;

      expect(res.status).toBe(201);
      expect(res.body).toEqual({ ...eventStub(), _id: eventId, __v: 0 });
    });
  });

  describe('deleteEvent', () => {
    it('deletes an event', async () => {
      await dbConnection.collection('events').insertOne(eventStub());

      const events = await apiClient().get('/event');

      const eventId = events.body[0]._id;

      const res = await apiClient().delete(`/event/${eventId}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({});
    });
  });
});
