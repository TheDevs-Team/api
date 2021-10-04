'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateToken =
  exports.isValidDocument =
  exports.decryptPassword =
  exports.encryptPassword =
  exports.isValidPassword =
    void 0;
const bcryptjs_1 = require('bcryptjs');
const utils_1 = require('~/utils');
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const config_1 = require('~/config');
const isValidPassword = (password, confirm_password) => {
  return password === confirm_password;
};
exports.isValidPassword = isValidPassword;
const encryptPassword = (password) => {
  return bcryptjs_1.hashSync(password, 8);
};
exports.encryptPassword = encryptPassword;
const decryptPassword = (password, passwordCompare) => {
  return bcryptjs_1.compareSync(password, passwordCompare);
};
exports.decryptPassword = decryptPassword;
const isValidDocument = (document) => {
  return utils_1.CPF.isValid(document) || utils_1.CNPJ.isValid(document);
};
exports.isValidDocument = isValidDocument;
const generateToken = (id) => {
  return jsonwebtoken_1.default.sign({ id }, config_1.secret.key, {
    expiresIn: '30d',
  });
};
exports.generateToken = generateToken;
