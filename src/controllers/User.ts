import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User as UserModel } from '../models';
import {
  isValidPassword,
  STATUS_CODE,
  encryptPassword,
  isValidDocument,
  decryptPassword,
  generateToken,
  sendMail,
  TYPE_USER,
} from '../utils';
import { isEmpty } from 'lodash';

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const User = getRepository(UserModel);

    const { name, document, email, phone, type, password, confirm_password, financial_status }: CreateUserType =
      req.body;

    if (!isValidDocument(document)) return res.status(400).json({ code: STATUS_CODE.E12 });

    if (!isValidPassword(password, confirm_password)) return res.status(400).json({ code: STATUS_CODE.E13 });

    const findUser = await User.findOne({ where: [{ document }, { email: email.toLocaleLowerCase() }] });

    if (!isEmpty(findUser)) return res.status(404).json({ code: STATUS_CODE.E10 });

    try {
      const user = User.create({
        name,
        document,
        email: email.toLocaleLowerCase(),
        phone,
        type,
        password: encryptPassword(password),
        financial_status,
      });

      const response = await User.save(user);

      if (response) {
        sendMail(email, name, password);
      }

      return res.status(201).json({ user, token: generateToken(user.id) });
    } catch (err) {
      return res.status(404).json({ code: STATUS_CODE.E01 });
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    const User = getRepository(UserModel);

    const id = req.user;

    try {
      const user = await User.findOne({ id });
      if (isEmpty(user)) return res.status(400).json({ code: STATUS_CODE.E11 });
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    const User = getRepository(UserModel);

    try {
      const users = await User.find({
        order: { name: 'ASC' },
      });

      return res.status(200).json(users);
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const User = getRepository(UserModel);

    try {
      const { id }: FindUserType = req.body;

      const user = await User.findOne({ id });

      if (isEmpty(user)) return res.status(400).json({ code: STATUS_CODE.E11 });

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

      const user = await User.findOne({ id });

      if (isEmpty(user)) return res.status(400).json({ code: STATUS_CODE.E11 });

      await User.update({ id }, { active });

      return res.status(200).json({ code: STATUS_CODE.S01 });
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const User = getRepository(UserModel);

    try {
      const { id, name, phone, type, password, confirm_password }: UpdateUserType = req.body;

      const user = await User.findOne({ id });

      if (isEmpty(user)) return res.status(400).json({ code: STATUS_CODE.E11 });

      if (!isValidPassword(password, confirm_password)) return res.status(400).json({ code: STATUS_CODE.E13 });

      await User.update(
        { id },
        {
          name,
          phone,
          type,
          password: encryptPassword(password),
          active: true,
        },
      );

      const updatedUser = await User.findOne({ id });

      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }

  async login(req: Request, res: Response) {
    const User = getRepository(UserModel);
    try {
      const { email, password }: UserLoginType = req.body;

      const user = (await User.findOne({
        where: { email: email.toLocaleLowerCase(), active: true },
      })) as UserModel & UserType;

      if (isEmpty(user)) return res.status(400).json({ code: STATUS_CODE.E11 });

      if (!decryptPassword(password, user.password)) return res.status(400).json({ code: STATUS_CODE.E13 });

      return res.json({ user, token: generateToken(user.id) });
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }

  async createTemporaryUser(req: Request, res: Response): Promise<Response> {
    const User = getRepository(UserModel);

    const { name, document, email, phone, type, financial_status }: CreateTemporaryUserType = req.body;

    if (!isValidDocument(document)) return res.status(400).json({ code: STATUS_CODE.E12 });

    const findUser = await User.findOne({ where: [{ document }, { email: email.toLocaleLowerCase() }] });

    if (!isEmpty(findUser)) return res.status(404).json({ code: STATUS_CODE.E10 });

    try {
      const user = User.create({
        name,
        document,
        email: email.toLocaleLowerCase(),
        phone,
        type,
        financial_status,
        active: false,
      }) as TemporaryUserType;

      const response = await User.save(user);

      if (response) {
        sendMail(email, name, response.id);
      }

      return res.status(201).json({ code: STATUS_CODE.S01 });
    } catch (err) {
      return res.status(404).json({ code: STATUS_CODE.E01 });
    }
  }

  async updateTemporaryUser(req: Request, res: Response): Promise<Response> {
    const User = getRepository(UserModel);

    try {
      const { id, password, confirm_password }: UpdateTemporaryUserType = req.body;

      const user = (await User.findOne({ where: [{ id }, { active: false }] })) as UserModel & UserType;

      if (isEmpty(user)) return res.status(400).json({ code: STATUS_CODE.E15 });

      if (!isValidPassword(password, confirm_password)) return res.status(400).json({ code: STATUS_CODE.E13 });

      await User.update(
        { id },
        {
          password: encryptPassword(password),
          active: true,
        },
      );

      return res.status(200).json({ code: STATUS_CODE.S01 });
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }

  async listByType(req: Request, res: Response): Promise<Response> {
    const User = getRepository(UserModel);

    try {
      const adms = await User.find({
        where: { type: TYPE_USER.ADMIN },
        order: { name: 'ASC' },
      });

      const users = await User.find({
        where: { type: TYPE_USER.USER },
        order: { name: 'ASC' },
      });

      return res.status(200).json({ adms, users });
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }
}

export default new UserController();
