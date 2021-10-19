import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User as UserModel, Course as CourseModel, Material as MaterialModel } from '../models';

class DashBoardController {
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
}

export default new DashBoardController();
