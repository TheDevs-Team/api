import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { getRepository } from 'typeorm';
import { Course as CourseModel, User as UserModel } from '~/models';
import { STATUS_CODE, TYPE_USER } from '~/utils';

class CourseController {
  async create(req: Request, res: Response): Promise<Response> {
    const Course = getRepository(CourseModel);
    const User = getRepository(UserModel);

    try {
      const manager_id = req.user;

      const { name }: CreateCourseType = req.body;

      const user = (await User.findOne({
        id: manager_id,
        type: TYPE_USER.ADMIN || TYPE_USER.MANAGER,
        active: true,
      })) as UserModel & UserType;

      if (isEmpty(user)) throw res.status(400).json({ code: STATUS_CODE.E20 });

      const course = Course.create({ name, manager_id }) as CourseModel & CourseType;

      await Course.save(course);

      return res.status(201).json({ code: STATUS_CODE.S01 });
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    const Course = getRepository(CourseModel);

    const courses = (await Course.find({ active: true })) as CourseModel[] & CourseType[];

    return res.status(200).json(courses);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const Course = getRepository(CourseModel);

    try {
      const { id }: CourseType = req.body;
      const course = (await Course.findOne({ id })) as CourseModel & CourseType;

      if (isEmpty(course)) throw res.status(400).json({ code: STATUS_CODE.E21 });

      await Course.delete(id);

      return res.status(200).json({ code: STATUS_CODE.S01 });
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }
}

export default new CourseController();
