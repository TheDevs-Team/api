'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.StudentCourseController =
  exports.ServiceController =
  exports.MaterialController =
  exports.UserController =
  exports.CourseController =
    void 0;
var Course_1 = require('./Course');
Object.defineProperty(exports, 'CourseController', {
  enumerable: true,
  get: function () {
    return __importDefault(Course_1).default;
  },
});
var User_1 = require('./User');
Object.defineProperty(exports, 'UserController', {
  enumerable: true,
  get: function () {
    return __importDefault(User_1).default;
  },
});
var Material_1 = require('./Material');
Object.defineProperty(exports, 'MaterialController', {
  enumerable: true,
  get: function () {
    return __importDefault(Material_1).default;
  },
});
var Service_1 = require('./Service');
Object.defineProperty(exports, 'ServiceController', {
  enumerable: true,
  get: function () {
    return __importDefault(Service_1).default;
  },
});
var StudentCourse_1 = require('./StudentCourse');
Object.defineProperty(exports, 'StudentCourseController', {
  enumerable: true,
  get: function () {
    return __importDefault(StudentCourse_1).default;
  },
});
