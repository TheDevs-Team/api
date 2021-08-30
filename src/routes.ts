import { Request, Response, Router } from 'express';
import UserController from './controllers/User';
import { authentication } from './middlewares';

const routes = Router();

routes.get('/', (req, res) => res.status(200).json({ ok: true }));

routes.get('/user/find', authentication, UserController.index);
routes.post('/user/login', UserController.login);
routes.post('/user/create', UserController.create);
routes.put('/user/update', authentication, UserController.update);
routes.put('/user/disable', authentication, UserController.disable);
routes.delete('/user/delete', authentication, UserController.delete);
routes.get('/user/list', authentication, UserController.list);
routes.get('/files', UserController.files);

routes.get('*', (req: Request, res: Response) => res.status(400).json({ error: 'no route found' }));
routes.post('*', (req: Request, res: Response) => res.status(400).json({ error: 'no route found' }));
routes.put('*', (req: Request, res: Response) => res.status(400).json({ error: 'no route found' }));
routes.delete('*', (req: Request, res: Response) => res.status(400).json({ error: 'no route found' }));

export default routes;
