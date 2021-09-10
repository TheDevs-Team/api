import { Request, Response } from 'express';
import DatauriParser from 'datauri/parser';
import path from 'path';
import { cloudinary } from '~/config';

class ServiceController {
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

export default new ServiceController();
