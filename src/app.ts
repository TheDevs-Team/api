import express from 'express';
import routes from './routes';
import 'reflect-metadata';

import './database';

const app = express();

app.use(express.json());

app.use(routes);

export default app;
