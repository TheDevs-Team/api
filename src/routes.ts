import { Router } from 'express';
import UserController from './controllers/User';

const routes = Router();

routes.get('/', (req, res) => res.status(200).json({ ok: true }));

routes.get('/user', UserController.create);
routes.post('/user', UserController.create);
routes.put('/user', UserController.create);
routes.delete('/user', UserController.create);

export default routes;
