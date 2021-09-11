import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import './database';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json({ limit: '5000mb' }));
app.use(express.urlencoded({ limit: '5000mb', extended: true }));

app.use(routes);

export default app;
