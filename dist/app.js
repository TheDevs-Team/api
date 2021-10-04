'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
require('reflect-metadata');
const express_1 = __importDefault(require('express'));
const routes_1 = __importDefault(require('./routes'));
require('./database');
const cors_1 = __importDefault(require('cors'));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json({ limit: '5000mb' }));
app.use(express_1.default.urlencoded({ limit: '5000mb', extended: true }));
app.use(routes_1.default);
exports.default = app;
