'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const path_1 = __importDefault(require('path'));
const fs_1 = __importDefault(require('fs'));
const googleapis_1 = require('googleapis');
const config_1 = require('~/config');
class ServiceController {
  async uploadFile(req, res) {
    const KEYFILEPATH = path_1.default.join(__dirname, '..', 'config', 'ServiceAccountCred.json');
    const auth = new googleapis_1.google.auth.GoogleAuth({
      keyFile: KEYFILEPATH,
      scopes: config_1.GoogleDriveConfig.scopes,
    });
    try {
      const drive = googleapis_1.google.drive({ version: 'v3', auth });
      const media = {
        mimeType: req.file?.mimetype,
        body: fs_1.default.createReadStream(req.file?.path),
      };
      const fileData = {
        name: req.file?.originalname,
        parents: [config_1.GoogleDriveConfig.folderId],
      };
      const response = await drive.files.create({
        media,
        requestBody: fileData,
        fields: 'id',
      });
      if (response.data.id) {
        fs_1.default.unlinkSync(req.file?.path);
      }
      return res.status(200).json({ file: `https://drive.google.com/uc?id=${response.data.id}` });
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  async listFiles(req, res) {
    const KEYFILEPATH = path_1.default.join(__dirname, '..', 'config', 'ServiceAccountCred.json');
    const auth = new googleapis_1.google.auth.GoogleAuth({
      keyFile: KEYFILEPATH,
      scopes: config_1.GoogleDriveConfig.scopes,
    });
    try {
      const drive = googleapis_1.google.drive({ version: 'v3', auth });
      const media = {
        mimeType: req.file?.mimetype,
        body: fs_1.default.createReadStream(req.file?.path),
      };
      const fileData = {
        name: req.file?.originalname,
        parents: [config_1.GoogleDriveConfig.folderId],
      };
      const response = await drive.files.create({
        media,
        requestBody: fileData,
        fields: 'id',
      });
      if (response.data.id) {
        fs_1.default.unlinkSync(req.file?.path);
      }
      return res.status(200).json({ file: `https://drive.google.com/uc?id=${response.data.id}` });
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}
exports.default = new ServiceController();
