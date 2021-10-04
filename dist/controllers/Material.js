'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const lodash_1 = require('lodash');
const typeorm_1 = require('typeorm');
const models_1 = require('~/models');
const utils_1 = require('~/utils');
class MaterialController {
  async create(req, res) {
    const Course = typeorm_1.getRepository(models_1.Course);
    const Material = typeorm_1.getRepository(models_1.Material);
    try {
      const { name, course_id, type, file } = req.body;
      const course = await Course.findOne({ where: { id: course_id } });
      if (lodash_1.isEmpty(course)) throw res.status(400).json({ code: utils_1.STATUS_CODE.E21 });
      const material = Material.create({ name, type, file, course_id });
      await Material.save(material);
      return res.status(201).json({ code: utils_1.STATUS_CODE.S01, material });
    } catch (err) {
      return res.status(400).json({ code: utils_1.STATUS_CODE.E01 });
    }
  }
  async list(req, res) {
    const Material = typeorm_1.getRepository(models_1.Material);
    try {
      const material = await Material.find({ relations: ['course'] });
      return res.status(201).json(material);
    } catch (err) {
      return res.status(400).json({ code: utils_1.STATUS_CODE.E01 });
    }
  }
}
exports.default = new MaterialController();
