import { Router } from 'express';
import UserController from './controllers/User';

const routes = Router();

routes.get('/', (req, res) => res.status(200).json({ ok: true }));

routes.post('/user', UserController.index);
routes.post('/user/create', UserController.create);
routes.put('/user/update', UserController.create);
routes.delete('/user/delete', UserController.create);
routes.get('/user/list', UserController.list);

export default routes;
