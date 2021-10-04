'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const controllers_1 = require('~/controllers');
const middlewares_1 = require('~/middlewares');
const multer_1 = __importDefault(require('./config/multer'));
const routes = express_1.Router();
/**
  @description User Controller
**/
routes.get('/user/find', middlewares_1.authentication, controllers_1.UserController.index);
routes.post('/user/login', controllers_1.UserController.login);
routes.post('/user/create', controllers_1.UserController.create);
routes.put('/user/update', middlewares_1.authentication, controllers_1.UserController.update);
routes.put('/user/disable', middlewares_1.authentication, controllers_1.UserController.disable);
routes.delete('/user/delete', middlewares_1.authentication, controllers_1.UserController.delete);
routes.get('/user/list', controllers_1.UserController.list);
/**
  @description User Temporary Controller
**/
routes.post('/temporary-user/create', controllers_1.UserController.createTemporaryUser);
routes.put('/temporary-user/update', controllers_1.UserController.updateTemporaryUser);
/**
  @description Course Controller
**/
routes.post('/course', middlewares_1.authentication, controllers_1.CourseController.find);
routes.get('/course/list', middlewares_1.authentication, controllers_1.CourseController.list);
routes.post('/course/create', middlewares_1.authentication, controllers_1.CourseController.create);
routes.post('/course/delete', middlewares_1.authentication, controllers_1.CourseController.delete);
routes.put('/course', middlewares_1.authentication, controllers_1.CourseController.update);
/**
  @description Material Controller
**/
routes.post('/material/create', middlewares_1.authentication, controllers_1.MaterialController.create);
routes.get('/material/list', middlewares_1.authentication, controllers_1.MaterialController.list);
/**
  @description Students Course Controller
**/
routes.post('/student-course/create', middlewares_1.authentication, controllers_1.StudentCourseController.create);
routes.get('/student-course/list', middlewares_1.authentication, controllers_1.StudentCourseController.list);
/**
  @description Service Controller
**/
routes.get(
  '/service/file/create',
  middlewares_1.authentication,
  multer_1.default.single('file'),
  controllers_1.ServiceController.uploadFile,
);
exports.default = routes;
