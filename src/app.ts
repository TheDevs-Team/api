import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import './database';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(routes);

export default app;
