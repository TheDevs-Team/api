'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const lodash_1 = require('lodash');
const utils_1 = require('~/utils');
const config_1 = require('~/config');
const authentication = (req, res, next) => {
  const token = req.headers.authorization;
  if (lodash_1.isEmpty(token)) throw res.status(401).json({ code: utils_1.STATUS_CODE.E14 });
  jsonwebtoken_1.default.verify(token, config_1.secret.key, (err, decoded) => {
    if (err) throw res.status(401).json({ code: utils_1.STATUS_CODE.E14 });
    req.user = decoded?.id;
    return next();
  });
};
exports.authentication = authentication;
