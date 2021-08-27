import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
  async create(req: Request, res: Response) {
    const user = getRepository(User);

    const response = user.create(req.body);

    await user.save(response);

    return res.json(response);
  }
}

export default new UserController();
