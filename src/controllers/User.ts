import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User as UserModel } from '~/models';
import { isValidPassword, STATUS_CODE, encryptPassword, isValidDocument } from '~/utils';
import { isEmpty } from 'lodash';

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const User = getRepository(UserModel);

    const { name, document, email, phone, type, password, confirm_password }: CreateUserType = req.body;

    if (!isValidDocument(document)) throw res.status(400).json({ code: STATUS_CODE.E12 });

    if (!isValidPassword(password, confirm_password)) throw res.status(400).json({ code: STATUS_CODE.E13 });

    const findUser = await User.findOne({ where: [{ document }, { email }] });

    if (!isEmpty(findUser)) throw res.status(404).json({ code: STATUS_CODE.E10 });

    try {
      const user = User.create({
        name,
        document,
        email,
        phone,
        type,
        password: encryptPassword(password),
      });

      await User.save(user);

      return res.status(201).json({ data: user });
    } catch (err) {
      return res.status(404).json({ code: STATUS_CODE.E01 });
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    const User = getRepository(UserModel);

    const { document, email, id }: FindUserType = req.body;

    try {
      const user = await User.findOne({ where: [{ document }, { email }, { id }] });
      if (isEmpty(user)) throw res.status(400).json({ code: STATUS_CODE.E10 });
      return res.status(200).json({ data: user });
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const User = getRepository(UserModel);

      const users = await User.find();

      return res.status(200).json({ data: users });
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }
}

export default new UserController();
