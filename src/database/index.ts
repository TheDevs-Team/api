import { createConnection } from 'typeorm';

try {
  createConnection();
  console.log('database connection established');
} catch (err) {
  console.log(err);
}
