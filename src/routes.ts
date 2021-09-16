import { Router } from 'express';
import {
  UserController,
  CourseController,
  MaterialController,
  ServiceController,
  StudentCourseController,
} from '~/controllers';
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
  @description User Temporary Controller
**/

routes.post('/temporary-user/create', UserController.createTemporaryUser);
routes.put('/temporary-user/update', UserController.updateTemporaryUser);

/**
  @description Course Controller
**/

routes.post('/course', authentication, CourseController.create);
routes.get('/course/list', authentication, CourseController.list);
routes.post('/course/delete', authentication, CourseController.delete);
routes.put('/course', authentication, CourseController.update);

/**
  @description Material Controller
**/

routes.post('/material/create', authentication, MaterialController.create);
routes.get('/material/list', authentication, MaterialController.list);

/**
  @description Students Course Controller
**/

routes.post('/student-course/create', authentication, StudentCourseController.create);
routes.get('/student-course/list', authentication, StudentCourseController.list);

/**
  @description Service Controller
**/

routes.get('/service/file/create', authentication, uploads.single('file'), ServiceController.uploadFile);

export default routes;
