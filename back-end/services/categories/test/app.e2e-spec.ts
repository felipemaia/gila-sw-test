import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('List of Categories', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/getcategorylist (GET)', () => {
    return request(app.getHttpServer())
      .get('/getcategorylist')
      .expect(200)
      .expect([{ name: 'Sports' }, { name: 'Finance' }, { name: 'Movies' }]);
  });
});
