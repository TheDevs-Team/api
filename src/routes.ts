import { Router } from 'express';
import { UserController, CourseController, MaterialController, ServiceController } from '~/controllers';
import { authentication } from '~/middlewares';
import uploads from './config/multer';

const routes = Router();

/**
  @description User Controller
**/

routes.get('/user/find', authentication, UserController.index);
routes.post('/user/login', UserController.login);
routes.post('/user/create', UserController.create);
routes.put('/user/update', authentication, UserController.update);
routes.put('/user/disable', authentication, UserController.disable);
routes.delete('/user/delete', authentication, UserController.delete);
routes.get('/user/list', authentication, UserController.list);

/**
  @description Course Controller
**/

routes.post('/course/create', authentication, CourseController.create);
routes.get('/course/list', authentication, CourseController.list);
routes.delete('/course/delete', authentication, CourseController.delete);
routes.put('/course/update', authentication, CourseController.update);

/**
  @description Material Controller
**/

routes.post('/material/create', MaterialController.create);
routes.get('/material/list', MaterialController.list);

/**
  @description Service Controller
**/

routes.get('/service/file/create', uploads.single('file'), ServiceController.uploadFile);

export default routes;
