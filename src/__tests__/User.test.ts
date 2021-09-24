import request from 'supertest';
import app from '../app';
import { createConnection } from 'typeorm';

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('Should be able to list all users', async () => {
    const response = await request(app).get('/user/list');

    expect(response.status).toBe(200);
  });
});
