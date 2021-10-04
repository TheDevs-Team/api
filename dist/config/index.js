'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.GoogleDriveConfig = exports.ServiceAccountCred = exports.secret = void 0;
var secret_json_1 = require('./secret.json');
Object.defineProperty(exports, 'secret', {
  enumerable: true,
  get: function () {
    return __importDefault(secret_json_1).default;
  },
});
var ServiceAccountCred_json_1 = require('./ServiceAccountCred.json');
Object.defineProperty(exports, 'ServiceAccountCred', {
  enumerable: true,
  get: function () {
    return __importDefault(ServiceAccountCred_json_1).default;
  },
});
var GoogleDriveConfig_json_1 = require('./GoogleDriveConfig.json');
Object.defineProperty(exports, 'GoogleDriveConfig', {
  enumerable: true,
  get: function () {
    return __importDefault(GoogleDriveConfig_json_1).default;
  },
});
