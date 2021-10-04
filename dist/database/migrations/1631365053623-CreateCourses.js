'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CreateCourses1631365053623 = void 0;
const typeorm_1 = require('typeorm');
class CreateCourses1631365053623 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new typeorm_1.Table({
        name: 'courses',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'manager_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    queryRunner.clearSqlMemory();
    const foreignKey = new typeorm_1.TableForeignKey({
      columnNames: ['manager_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL',
    });
    await queryRunner.createForeignKey('courses', foreignKey);
  }
  async down(queryRunner) {
    await queryRunner.dropTable('courses');
  }
}
exports.CreateCourses1631365053623 = CreateCourses1631365053623;
