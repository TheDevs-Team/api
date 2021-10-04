'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CreateStudentsCourses1631365901666 = void 0;
const typeorm_1 = require('typeorm');
class CreateStudentsCourses1631365901666 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new typeorm_1.Table({
        name: 'studentsCourses',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            isUnique: true,
          },
          {
            name: 'course_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
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
    const foreignKeyCourse = new typeorm_1.TableForeignKey({
      columnNames: ['course_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'courses',
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL',
    });
    await queryRunner.createForeignKey('studentsCourses', foreignKeyCourse);
    queryRunner.clearSqlMemory();
    const foreignKeyUser = new typeorm_1.TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL',
    });
    await queryRunner.createForeignKey('studentsCourses', foreignKeyUser);
  }
  async down(queryRunner) {
    await queryRunner.dropTable('studentsCourses');
  }
}
exports.CreateStudentsCourses1631365901666 = CreateStudentsCourses1631365901666;
