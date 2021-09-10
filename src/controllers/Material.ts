import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { getRepository } from 'typeorm';
import { Course as CourseModel, Material as MaterialModel } from '~/models';
import { STATUS_CODE } from '~/utils';

class MaterialController {
  async create(req: Request, res: Response): Promise<Response> {
    const Course = getRepository(CourseModel);
    const Material = getRepository(MaterialModel);

    try {
      const { name, course_id, type, file }: CreateMaterialType = req.body;

      const course = (await Course.findOne({ where: { id: course_id } })) as CourseModel & CourseType;

      if (isEmpty(course)) throw res.status(400).json({ code: STATUS_CODE.E21 });

      const material = Material.create({ name, type, file, course_id }) as MaterialModel & MaterialType;

      await Material.save(material);

      return res.status(201).json({ code: STATUS_CODE.S01, material });
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    const Material = getRepository(MaterialModel);

    try {
      const material = await Material.find({ relations: ['course'] });

      return res.status(201).json(material);
    } catch (err) {
      return res.status(400).json({ code: STATUS_CODE.E01 });
    }
  }
}

export default new MaterialController();
