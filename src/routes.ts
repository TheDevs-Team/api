import { Router } from 'express';
import { UserController, CourseController, MaterialController } from '~/controllers';
import { authentication } from '~/middlewares';
import multer from 'multer';

const routes = Router();
const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).single('file');

routes.get('/user/find', authentication, UserController.index);
routes.post('/user/login', UserController.login);
routes.post('/user/create', UserController.create);
routes.put('/user/update', authentication, UserController.update);
routes.put('/user/disable', authentication, UserController.disable);
routes.delete('/user/delete', authentication, UserController.delete);
routes.get('/user/list', authentication, UserController.list);
routes.post('/files', multerUploads, MaterialController.uploadFile);

routes.post('/course/create', authentication, CourseController.create);
routes.get('/course/list', authentication, CourseController.list);
routes.delete('/course/delete', authentication, CourseController.delete);
routes.put('/course/update', authentication, CourseController.update);

export default routes;
