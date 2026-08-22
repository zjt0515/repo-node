import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/todo (POST) accepts a valid todo', () => {
    return request(app.getHttpServer())
      .post('/todo')
      .send({
        title: 'write tests',
        content: 'add dto validation coverage',
        isCompleted: false,
      })
      .expect(201)
      .expect({
        title: 'write tests',
        content: 'add dto validation coverage',
        isCompleted: false,
      });
  });

  it('/todo (POST) rejects invalid payloads', () => {
    return request(app.getHttpServer())
      .post('/todo')
      .send({
        title: '',
        content: 'missing required rules',
        isCompleted: 'nope',
        extra: 'field',
      })
      .expect(400);
  });
});
