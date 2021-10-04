'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const typeorm_1 = require('typeorm');
try {
  typeorm_1.createConnection();
} catch (err) {
  console.log(err);
}
