/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User as UserModel } from '~/models';
import { isValidPassword, STATUS_CODE, encryptPassword, isValidDocument, decryptPassword } from '~/utils';
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
      if (isEmpty(user)) throw res.status(400).json({ code: STATUS_CODE.E11 });
      return res.status(200).json({ data: user });
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    const User = getRepository(UserModel);

    try {
      const users = await User.find();

      return res.status(200).json({ data: users });
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const User = getRepository(UserModel);

    try {
      const { id }: FindUserType = req.body;

      const user = await User.findOne({ where: { id } });

      if (isEmpty(user)) throw res.status(400).json({ code: STATUS_CODE.E11 });

      await User.delete(id);

      return res.status(200).json({ code: STATUS_CODE.S01 });
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }

  async disable(req: Request, res: Response): Promise<Response> {
    const User = getRepository(UserModel);

    try {
      const { id, active }: DisableUserType = req.body;

      const user = await User.findOne({ where: { id } });

      if (isEmpty(user)) throw res.status(400).json({ code: STATUS_CODE.E11 });

      await User.update({ id }, { active });

      return res.status(200).json({ code: STATUS_CODE.S01 });
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const User = getRepository(UserModel);

    try {
      const { email, id, name, phone, type, document, password, confirm_password }: UpdateUserType = req.body;

      const user = await User.findOne({ where: { id } });

      if (!isEmpty(user)) throw res.status(400).json({ code: STATUS_CODE.E10 });

      if (!isValidDocument(document)) throw res.status(400).json({ code: STATUS_CODE.E12 });

      if (!isValidPassword(password, confirm_password)) throw res.status(400).json({ code: STATUS_CODE.E13 });

      await User.update({ id }, { email, name, phone, type, document, password: encryptPassword(password) });

      return res.status(200).json({ code: STATUS_CODE.S01 });
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }

  async login(req: Request, res: Response) {
    const User = getRepository(UserModel);
    try {
      const { email, password }: UserLoginType = req.body;

      const user = await User.findOne({
        select: ['email', 'password'],
        where: { email, active: true },
      });

      if (isEmpty(user)) throw res.status(400).json({ code: STATUS_CODE.E11 });

      if (!decryptPassword(password, user?.password as string)) throw res.status(400).json({ code: STATUS_CODE.E13 });

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }
}

export default new UserController();
