import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { getRepository } from 'typeorm';
import { Course as CourseModel, Material as MaterialModel } from '../models';
import { STATUS_CODE } from '../utils';

class MaterialController {
  async create(req: Request, res: Response): Promise<Response> {
    const Course = getRepository(CourseModel);
    const Material = getRepository(MaterialModel);

    try {
      const { name, course_id, type, file }: CreateMaterialType = req.body;

      const course = (await Course.findOne({ where: { id: course_id } })) as CourseModel & CourseType;

      if (isEmpty(course)) return res.status(400).json({ code: STATUS_CODE.E21 });

      const material = Material.create({ name, type, file, course_id }) as MaterialModel & MaterialType;

      await Material.save(material);

      return res.status(201).json({ code: STATUS_CODE.S01, material });
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    const Material = getRepository(MaterialModel);
    const Course = getRepository(CourseModel);

    try {
      const { course_id } = req.params;
      const course = await Course.find({ where: { id: course_id } });

      if (isEmpty(course)) return res.status(400).json({ code: STATUS_CODE.E21 });

      const material = await Material.find({
        where: { course_id },
        relations: ['course'],
        order: { created_at: 'DESC' },
      });

      return res.status(201).json(material);
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }

  async remove(req: Request, res: Response): Promise<Response> {
    const Course = getRepository(CourseModel);
    const Material = getRepository(MaterialModel);

    try {
      const { id, course_id }: RemoveMaterialType = req.body;

      const course = (await Course.findOne({ where: { id: course_id } })) as CourseModel & CourseType;

      if (isEmpty(course)) return res.status(400).json({ code: STATUS_CODE.E21 });

      const material = await Material.findOne({ where: { id, course_id } });

      if (isEmpty(material)) return res.status(400).json({ code: STATUS_CODE.E24 });

      await Material.delete(id);

      return res.status(201).json({ code: STATUS_CODE.S01 });
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }
}

export default new MaterialController();
