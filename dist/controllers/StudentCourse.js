'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const lodash_1 = require('lodash');
const typeorm_1 = require('typeorm');
const models_1 = require('~/models');
const utils_1 = require('~/utils');
class StudentCourseController {
  async create(req, res) {
    const Course = typeorm_1.getRepository(models_1.Course);
    const User = typeorm_1.getRepository(models_1.User);
    const StudentCourse = typeorm_1.getRepository(models_1.StudentCourse);
    try {
      const { course_id, user_id } = req.body;
      const user = await User.findOne({ id: user_id });
      if (lodash_1.isEmpty(user)) throw res.status(400).json({ code: utils_1.STATUS_CODE.E11 });
      const course = await Course.findOne({ id: course_id });
      if (lodash_1.isEmpty(course)) throw res.status(400).json({ code: utils_1.STATUS_CODE.E21 });
      const studentCourse = StudentCourse.create({ course_id, user_id });
      await StudentCourse.save(studentCourse);
      return res.status(201).json(studentCourse);
    } catch (err) {
      return res.status(400).json({ code: utils_1.STATUS_CODE.E01 });
    }
  }
  async list(req, res) {
    const StudentCourse = typeorm_1.getRepository(models_1.StudentCourse);
    try {
      const studentCourse = await StudentCourse.find({ relations: ['course', 'user'] });
      return res.status(201).json(studentCourse);
    } catch (err) {
      return res.status(400).json({ code: utils_1.STATUS_CODE.E01 });
    }
  }
}
exports.default = new StudentCourseController();
