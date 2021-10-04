'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const typeorm_1 = require('typeorm');
const models_1 = require('~/models');
const utils_1 = require('~/utils');
const lodash_1 = require('lodash');
class UserController {
  async create(req, res) {
    const User = typeorm_1.getRepository(models_1.User);
    const { name, document, email, phone, type, password, confirm_password, financial_status } = req.body;
    if (!utils_1.isValidDocument(document)) throw res.status(400).json({ code: utils_1.STATUS_CODE.E12 });
    if (!utils_1.isValidPassword(password, confirm_password))
      throw res.status(400).json({ code: utils_1.STATUS_CODE.E13 });
    const findUser = await User.findOne({ where: [{ document }, { email: email.toLocaleLowerCase() }] });
    if (!lodash_1.isEmpty(findUser)) throw res.status(404).json({ code: utils_1.STATUS_CODE.E10 });
    try {
      const user = User.create({
        name,
        document,
        email: email.toLocaleLowerCase(),
        phone,
        type,
        password: utils_1.encryptPassword(password),
        financial_status,
      });
      const response = await User.save(user);
      if (response) {
        utils_1.sendMail(email, name, password);
      }
      return res.status(201).json({ user, token: utils_1.generateToken(user.id) });
    } catch (err) {
      return res.status(404).json({ code: utils_1.STATUS_CODE.E01 });
    }
  }
  async index(req, res) {
    const User = typeorm_1.getRepository(models_1.User);
    const id = req.user;
    try {
      const user = await User.findOne({ id });
      if (lodash_1.isEmpty(user)) throw res.status(400).json({ code: utils_1.STATUS_CODE.E11 });
      return res.status(200).json({ data: user });
    } catch (err) {
      return res.status(400).json({ code: utils_1.STATUS_CODE.E01 });
    }
  }
  async list(req, res) {
    const User = typeorm_1.getRepository(models_1.User);
    try {
      const users = await User.find({
        order: { name: 'ASC' },
      });
      return res.status(200).json(users);
    } catch (err) {
      return res.status(400).json({ code: utils_1.STATUS_CODE.E01 });
    }
  }
  async delete(req, res) {
    const User = typeorm_1.getRepository(models_1.User);
    try {
      const { id } = req.body;
      const user = await User.findOne({ id });
      if (lodash_1.isEmpty(user)) throw res.status(400).json({ code: utils_1.STATUS_CODE.E11 });
      await User.delete(id);
      return res.status(200).json({ code: utils_1.STATUS_CODE.S01 });
    } catch (err) {
      return res.status(400).json({ code: utils_1.STATUS_CODE.E01 });
    }
  }
  async disable(req, res) {
    const User = typeorm_1.getRepository(models_1.User);
    try {
      const { id, active } = req.body;
      const user = await User.findOne({ id });
      if (lodash_1.isEmpty(user)) throw res.status(400).json({ code: utils_1.STATUS_CODE.E11 });
      await User.update({ id }, { active });
      return res.status(200).json({ code: utils_1.STATUS_CODE.S01 });
    } catch (err) {
      return res.status(400).json({ code: utils_1.STATUS_CODE.E01 });
    }
  }
  async update(req, res) {
    const User = typeorm_1.getRepository(models_1.User);
    try {
      const { email, id, name, phone, type, document, password, confirm_password } = req.body;
      const user = await User.findOne({ id });
      if (lodash_1.isEmpty(user)) throw res.status(400).json({ code: utils_1.STATUS_CODE.E11 });
      const findUser = await User.findOne({ where: [{ document }, { email: email.toLocaleLowerCase() }] });
      if (!lodash_1.isEmpty(findUser)) throw res.status(400).json({ code: utils_1.STATUS_CODE.E10 });
      if (!lodash_1.isEmpty(document) && !utils_1.isValidDocument(document))
        throw res.status(400).json({ code: utils_1.STATUS_CODE.E12 });
      if (!utils_1.isValidPassword(password, confirm_password))
        throw res.status(400).json({ code: utils_1.STATUS_CODE.E13 });
      await User.update(
        { id },
        {
          email: email.toLocaleLowerCase(),
          name,
          phone,
          type,
          document,
          password: utils_1.encryptPassword(password),
          active: true,
        },
      );
      return res.status(200).json({ code: utils_1.STATUS_CODE.S01 });
    } catch (err) {
      return res.status(400).json({ code: utils_1.STATUS_CODE.E01 });
    }
  }
  async login(req, res) {
    const User = typeorm_1.getRepository(models_1.User);
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email: email.toLocaleLowerCase(), active: true },
      });
      if (lodash_1.isEmpty(user)) throw res.status(400).json({ code: utils_1.STATUS_CODE.E11 });
      if (!utils_1.decryptPassword(password, user.password))
        throw res.status(400).json({ code: utils_1.STATUS_CODE.E13 });
      return res.json({ user, token: utils_1.generateToken(user.id) });
    } catch (err) {
      return res.status(400).json({ code: utils_1.STATUS_CODE.E01 });
    }
  }
  async createTemporaryUser(req, res) {
    const User = typeorm_1.getRepository(models_1.User);
    const { name, document, email, phone, type, financial_status } = req.body;
    if (!utils_1.isValidDocument(document)) throw res.status(400).json({ code: utils_1.STATUS_CODE.E12 });
    const findUser = await User.findOne({ where: [{ document }, { email: email.toLocaleLowerCase() }] });
    if (!lodash_1.isEmpty(findUser)) throw res.status(404).json({ code: utils_1.STATUS_CODE.E10 });
    try {
      const user = User.create({
        name,
        document,
        email: email.toLocaleLowerCase(),
        phone,
        type,
        financial_status,
        active: false,
      });
      const response = await User.save(user);
      if (response) {
        utils_1.sendMail(email, name, response.id);
      }
      return res.status(201).json({ code: utils_1.STATUS_CODE.S01 });
    } catch (err) {
      return res.status(404).json({ code: utils_1.STATUS_CODE.E01 });
    }
  }
  async updateTemporaryUser(req, res) {
    const User = typeorm_1.getRepository(models_1.User);
    try {
      const { id, password, confirm_password } = req.body;
      const user = await User.findOne({ where: [{ id }, { active: false }] });
      if (lodash_1.isEmpty(user)) throw res.status(400).json({ code: utils_1.STATUS_CODE.E15 });
      if (!utils_1.isValidPassword(password, confirm_password))
        throw res.status(400).json({ code: utils_1.STATUS_CODE.E13 });
      await User.update(
        { id },
        {
          password: utils_1.encryptPassword(password),
          active: true,
        },
      );
      return res.status(200).json({ code: utils_1.STATUS_CODE.S01 });
    } catch (err) {
      return res.status(400).json({ code: utils_1.STATUS_CODE.E01 });
    }
  }
}
exports.default = new UserController();
