import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { getRepository } from 'typeorm';
import { Course as CourseModel, Material as MaterialModel } from '~/models';
import { STATUS_CODE } from '~/utils';
import DatauriParser from 'datauri/parser';
import path from 'path';
import { cloudinary } from '~/config';

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

  async uploadFile(req: Request, res: Response) {
    try {
      const dUri = new DatauriParser();

      const dataUri = (req: any) => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
      const file = dataUri(req).content;

      const { format, secure_url } = await cloudinary.uploader.upload(file as string);

      res.status(200).json({ type: format, file: secure_url });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new MaterialController();
