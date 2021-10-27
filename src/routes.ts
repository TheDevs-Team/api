import { Router } from 'express';
import {
  UserController,
  CourseController,
  MaterialController,
  ServiceController,
  StudentCourseController,
  DashboardController,
  NotificationController,
} from './controllers';
import { authentication } from './middlewares';
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
routes.post('/user/delete', authentication, UserController.delete);
routes.get('/user/list', UserController.list);
routes.get('/user/listByType', UserController.listByType);

/**
  @description User Temporary Controller
**/

routes.post('/temporary-user/create', UserController.createTemporaryUser);
routes.put('/temporary-user/update', UserController.updateTemporaryUser);

/**
  @description Course Controller
**/

routes.post('/course', authentication, CourseController.find);
routes.get('/course/list', authentication, CourseController.list);
routes.post('/course/create', authentication, CourseController.create);
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
routes.get('/student-course/find', authentication, StudentCourseController.find);

/**
  @description Service Controller
**/

routes.get('/service/file/create', authentication, uploads.single('file'), ServiceController.uploadFile);

/**
  @description Dashboard Controller
**/

routes.get('/dashboard/index', DashboardController.index);
routes.get('/dashboard/users/all', DashboardController.allUsers);
routes.get('/dashboard/users/pending', DashboardController.pendingUsers);
routes.get('/dashboard/courses/all', DashboardController.allCourses);
routes.get('/dashboard/materials/all', DashboardController.allMaterials);

/**
  @description Notification Controller
**/

routes.get('/notification/pendings', NotificationController.pendings);

export default routes;
