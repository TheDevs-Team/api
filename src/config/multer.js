import { diskStorage } from 'multer';
import { resolve } from 'path';

export const storage = new diskStorage({
  destination: resolve(__dirname, '..', '..', 'public', 'uploads'),
  filename: function (_req, file, cb) {
    const now = new Date();
    cb(null, '' + now.getMilliseconds() + '-' + file.originalname);
  },
});
