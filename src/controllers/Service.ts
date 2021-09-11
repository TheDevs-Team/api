import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { google } from 'googleapis';
import { GoogleDriveConfig } from '~/config';

class ServiceController {
  async uploadFile(req: Request, res: Response) {
    const KEYFILEPATH = path.join(__dirname, '..', 'config', 'ServiceAccountCred.json');

    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILEPATH,
      scopes: GoogleDriveConfig.scopes,
    });

    try {
      const drive = google.drive({ version: 'v3', auth });

      const media = {
        mimeType: req.file?.mimetype,
        body: fs.createReadStream(req.file?.path as string),
      };

      const fileData = {
        name: req.file?.originalname as string,
        parents: [GoogleDriveConfig.folderId],
      };

      const response = await drive.files.create({
        media,
        requestBody: fileData,
        fields: 'id',
      });

      if (response.data.id) {
        fs.unlinkSync(req.file?.path as string);
      }

      return res.status(200).json({ file: `https://drive.google.com/uc?id=${response.data.id}` });
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async listFiles(req: Request, res: Response) {
    const KEYFILEPATH = path.join(__dirname, '..', 'config', 'ServiceAccountCred.json');

    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILEPATH,
      scopes: GoogleDriveConfig.scopes,
    });

    try {
      const drive = google.drive({ version: 'v3', auth });

      const media = {
        mimeType: req.file?.mimetype,
        body: fs.createReadStream(req.file?.path as string),
      };

      const fileData = {
        name: req.file?.originalname as string,
        parents: [GoogleDriveConfig.folderId],
      };

      const response = await drive.files.create({
        media,
        requestBody: fileData,
        fields: 'id',
      });

      if (response.data.id) {
        fs.unlinkSync(req.file?.path as string);
      }

      return res.status(200).json({ file: `https://drive.google.com/uc?id=${response.data.id}` });
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

export default new ServiceController();
