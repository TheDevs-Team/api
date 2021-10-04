'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CNPJ = exports.CPF = void 0;
var cpf_cnpj_validator_1 = require('cpf-cnpj-validator');
Object.defineProperty(exports, 'CPF', {
  enumerable: true,
  get: function () {
    return cpf_cnpj_validator_1.cpf;
  },
});
Object.defineProperty(exports, 'CNPJ', {
  enumerable: true,
  get: function () {
    return cpf_cnpj_validator_1.cnpj;
  },
});
