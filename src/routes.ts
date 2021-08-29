import { Router } from 'express';
import UserController from './controllers/User';
import { authentication } from './middlewares';

const routes = Router();

routes.get('/', (req, res) => res.status(200).json({ ok: true }));

routes.post('/user', authentication, UserController.index);
routes.post('/user/create', UserController.create);
routes.put('/user/update', UserController.update);
routes.put('/user/disable', UserController.disable);
routes.delete('/user/delete', UserController.delete);
routes.get('/user/list', UserController.list);
routes.post('/login', UserController.login);

export default routes;
