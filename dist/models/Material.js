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
exports.Material = void 0;
const typeorm_1 = require('typeorm');
const Course_1 = require('./Course');
const uuid_1 = require('uuid');
let Material = class Material {
  constructor() {
    this.id = uuid_1.v4();
  }
};
__decorate([typeorm_1.PrimaryColumn(), __metadata('design:type', String)], Material.prototype, 'id', void 0);
__decorate([typeorm_1.Column(), __metadata('design:type', String)], Material.prototype, 'name', void 0);
__decorate([typeorm_1.Column(), __metadata('design:type', String)], Material.prototype, 'type', void 0);
__decorate([typeorm_1.Column(), __metadata('design:type', String)], Material.prototype, 'file', void 0);
__decorate(
  [
    typeorm_1.JoinColumn({ name: 'course_id' }),
    typeorm_1.ManyToOne(() => Course_1.Course),
    __metadata('design:type', Course_1.Course),
  ],
  Material.prototype,
  'course',
  void 0,
);
__decorate([typeorm_1.Column(), __metadata('design:type', String)], Material.prototype, 'course_id', void 0);
__decorate([typeorm_1.CreateDateColumn(), __metadata('design:type', Date)], Material.prototype, 'created_at', void 0);
__decorate([typeorm_1.CreateDateColumn(), __metadata('design:type', Date)], Material.prototype, 'updated_at', void 0);
Material = __decorate([typeorm_1.Entity('materials'), __metadata('design:paramtypes', [])], Material);
exports.Material = Material;
