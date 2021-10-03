import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { DatabaseService } from '../src/database/database.service';
import { daysStub } from '../src/day/test/stubs/days.stub';
import { AppModule } from '../src/app.module';

describe('dayController (e2e)', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    dbConnection = module.get<DatabaseService>(DatabaseService).getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await dbConnection.collection('days').deleteMany({});
    await app.close();
  });

  describe('getDays', () => {
    it('should return an array of days', async () => {
      await dbConnection.collection('days').insertOne(daysStub());
      console.log('Day Collection: ', dbConnection.collection('days'));

      const response = await request(httpServer).get('/day');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([daysStub()]);
    });
  });
});
