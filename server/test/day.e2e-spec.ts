import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { DatabaseService } from 'src/database/database.service';
import { daysStub } from 'src/day/test/stubs/days.stub';
import { AppModule } from '../src/app.module';

describe('dayController (e2e)', () => {
  let dbConnection: Connection;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = module.createNestApplication();
    await app.init();
    dbConnection = module.get<DatabaseService>(DatabaseService).getDbHandle();
  });
  describe('getDays', async () => {
    await dbConnection.collection('days').insertOne(daysStub());
  });
});
