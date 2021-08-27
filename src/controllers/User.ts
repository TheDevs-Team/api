import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User as UserModel } from '../models/User';
import { isValidPassword, STATUS_CODE } from '../utils';
import { isEmpty } from 'lodash';
import { hashSync } from 'bcryptjs';

class UserController {
  async create(req: Request, res: Response) {
    const User = getRepository(UserModel);

    const { name, document, email, phone, type, password, confirm_password }: CreateUserType = req.body;

    if (!isValidPassword(password, confirm_password)) throw res.status(400).json({ code: STATUS_CODE.E13 });

    const findUser = await User.findOne({ where: [{ document }, { email }] });

    if (!isEmpty(findUser)) throw res.status(401).json({ code: STATUS_CODE.E10 });

    const user = User.create({
      name,
      document,
      email,
      phone,
      type,
      password: hashSync(password, 8),
    });

    await User.save(user);

    return res.json(user);
  }
}

export default new UserController();
