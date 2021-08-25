import { Request, Response, Router } from 'express';

const routes = Router();

routes.post('/', async (req: Request, res: Response) => {
  return res.json(req.body);
});

export default routes;
