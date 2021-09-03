import { Router } from 'express';
import { UserController, CourseController } from '~/controllers';
import { authentication } from '~/middlewares';
import multer from 'multer';

const routes = Router();
const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).single('image');

routes.get('/user/find', authentication, UserController.index);
routes.post('/user/login', UserController.login);
routes.post('/user/create', UserController.create);
routes.put('/user/update', authentication, UserController.update);
routes.put('/user/disable', authentication, UserController.disable);
routes.delete('/user/delete', authentication, UserController.delete);
routes.get('/user/list', authentication, UserController.list);
routes.post('/files', multerUploads, UserController.files);

routes.post('/course/create', authentication, CourseController.create);
routes.get('/course/list', authentication, CourseController.list);
routes.put('/course/update', authentication, CourseController.update);

export default routes;
