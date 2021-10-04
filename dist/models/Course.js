'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Course = void 0;
const typeorm_1 = require('typeorm');
const User_1 = require('./User');
const uuid_1 = require('uuid');
let Course = class Course {
  constructor() {
    this.id = uuid_1.v4();
    this.active = true;
  }
};
__decorate([typeorm_1.PrimaryColumn(), __metadata('design:type', String)], Course.prototype, 'id', void 0);
__decorate([typeorm_1.Column(), __metadata('design:type', String)], Course.prototype, 'name', void 0);
__decorate([typeorm_1.Column(), __metadata('design:type', String)], Course.prototype, 'description', void 0);
__decorate(
  [
    typeorm_1.JoinColumn({ name: 'manager_id' }),
    typeorm_1.ManyToOne(() => User_1.User),
    __metadata('design:type', User_1.User),
  ],
  Course.prototype,
  'user',
  void 0,
);
__decorate([typeorm_1.Column(), __metadata('design:type', String)], Course.prototype, 'manager_id', void 0);
__decorate([typeorm_1.Column(), __metadata('design:type', Boolean)], Course.prototype, 'active', void 0);
__decorate([typeorm_1.CreateDateColumn(), __metadata('design:type', Date)], Course.prototype, 'created_at', void 0);
__decorate([typeorm_1.CreateDateColumn(), __metadata('design:type', Date)], Course.prototype, 'updated_at', void 0);
Course = __decorate([typeorm_1.Entity('courses'), __metadata('design:paramtypes', [])], Course);
exports.Course = Course;
