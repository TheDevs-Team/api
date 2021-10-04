import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { getRepository } from 'typeorm';
import { Course as CourseModel, User as UserModel, StudentCourse as StudentCourseModel } from '../models';
import { STATUS_CODE } from '../utils';

class StudentCourseController {
  async create(req: Request, res: Response): Promise<Response> {
    const Course = getRepository(CourseModel);
    const User = getRepository(UserModel);
    const StudentCourse = getRepository(StudentCourseModel);

    try {
      const { course_id, user_id }: CreateStudentCourseType = req.body;

      const user = (await User.findOne({ id: user_id })) as UserModel & UserType;

      if (isEmpty(user)) throw res.status(400).json({ code: STATUS_CODE.E11 });

      const course = (await Course.findOne({ id: course_id })) as CourseModel & CourseType;

      if (isEmpty(course)) throw res.status(400).json({ code: STATUS_CODE.E21 });

      const studentCourse = StudentCourse.create({ course_id, user_id }) as StudentCourseModel & StudentCourseType;

      await StudentCourse.save(studentCourse);

      return res.status(201).json(studentCourse);
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    const StudentCourse = getRepository(StudentCourseModel);

    try {
      const studentCourse = await StudentCourse.find({ relations: ['course', 'user'] });

      return res.status(201).json(studentCourse);
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }
}

export default new StudentCourseController();
