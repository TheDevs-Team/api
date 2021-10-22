import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User as UserModel, Course as CourseModel, Material as MaterialModel } from '../models';

class DashBoardController {
  async index(req: Request, res: Response): Promise<Response> {
    const User = getRepository(UserModel);
    const Course = getRepository(CourseModel);
    const Material = getRepository(MaterialModel);

    const users = (await User.find()).length;
    const pendings = (await User.find({ where: { financial_status: 'WAITING_PAYMENT' } })).length;

    const courses = (await Course.find()).length;
    const newCourses = await Course.find({
      order: { name: 'ASC' },
      take: 3,
    });

    const materials = (await Material.find()).length;

    return res.status(200).json({ users, courses, materials, pendings, newCourses });
  }

  async allUsers(req: Request, res: Response): Promise<Response> {
    const User = getRepository(UserModel);

    const users = await User.find({ where: { active: true } });

    return res.status(200).json({ users: users.length });
  }

  async pendingUsers(req: Request, res: Response): Promise<Response> {
    const User = getRepository(UserModel);

    const users = await User.find({ where: { financial_status: 'WAITING_PAYMENT' } });

    return res.status(200).json({ users: users.length });
  }

  async allCourses(req: Request, res: Response): Promise<Response> {
    const Course = getRepository(CourseModel);

    const courses = await Course.find();

    return res.status(200).json({ courses: courses.length });
  }

  async allMaterials(req: Request, res: Response): Promise<Response> {
    const Material = getRepository(MaterialModel);

    const materials = await Material.find();

    return res.status(200).json({ materials: materials.length });
  }

  async newCourses(req: Request, res: Response): Promise<Response> {
    const Course = getRepository(CourseModel);

    const courses = await Course.find({ order: { name: 'ASC' } });

    return res.status(200).json({ courses: courses.length });
  }
}

export default new DashBoardController();
