'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const supertest_1 = __importDefault(require('supertest'));
const app_1 = __importDefault(require('../app'));
const typeorm_1 = require('typeorm');
describe('Users', () => {
  beforeAll(async () => {
    const connection = await typeorm_1.createConnection();
    await connection.runMigrations();
  });
  it('Should be able to list all users', async () => {
    const response = await supertest_1.default(app_1.default).get('/user/list');
    expect(response.status).toBe(200);
  });
});
