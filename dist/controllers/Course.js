'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const lodash_1 = require('lodash');
const typeorm_1 = require('typeorm');
const models_1 = require('~/models');
const utils_1 = require('~/utils');
class CourseController {
  async create(req, res) {
    const Course = typeorm_1.getRepository(models_1.Course);
    const User = typeorm_1.getRepository(models_1.User);
    try {
      const manager_id = req.user;
      const { name, description } = req.body;
      const user = await User.findOne({
        id: manager_id,
        type: utils_1.TYPE_USER.ADMIN || utils_1.TYPE_USER.MANAGER,
        active: true,
      });
      if (lodash_1.isEmpty(user)) throw res.status(400).json({ code: utils_1.STATUS_CODE.E20 });
      const course = Course.create({ name, description, manager_id });
      await Course.save(course);
      return res.status(201).json({ code: utils_1.STATUS_CODE.S01 });
    } catch (err) {
      return res.status(400).json({ code: utils_1.STATUS_CODE.E01 });
    }
  }
  async list(req, res) {
    const Course = typeorm_1.getRepository(models_1.Course);
    const courses = await Course.find({ relations: ['user'] });
    return res.status(200).json(courses);
  }
  async find(req, res) {
    const Course = typeorm_1.getRepository(models_1.Course);
    const { id } = req.body;
    const courses = await Course.findOne({ id }, { relations: ['user'] });
    if (lodash_1.isEmpty(courses)) throw res.status(400).json({ code: utils_1.STATUS_CODE.E21 });
    return res.status(200).json(courses);
  }
  async delete(req, res) {
    const Course = typeorm_1.getRepository(models_1.Course);
    try {
      const { id } = req.body;
      const course = await Course.findOne({ id });
      if (lodash_1.isEmpty(course)) throw res.status(400).json({ code: utils_1.STATUS_CODE.E21 });
      await Course.delete(id);
      return res.status(200).json({ code: utils_1.STATUS_CODE.S01 });
    } catch (err) {
      return res.status(400).json({ code: utils_1.STATUS_CODE.E01 });
    }
  }
  async update(req, res) {
    const Course = typeorm_1.getRepository(models_1.Course);
    try {
      const { id, name } = req.body;
      const course = await Course.findOne({ id });
      if (lodash_1.isEmpty(course)) throw res.status(400).json({ code: utils_1.STATUS_CODE.E21 });
      await Course.update({ id }, { name });
      return res.status(200).json({ code: utils_1.STATUS_CODE.S01 });
    } catch (err) {
      return res.status(400).json({ code: utils_1.STATUS_CODE.E01 });
    }
  }
}
exports.default = new CourseController();
