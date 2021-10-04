'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CreateMaterials1631365676792 = void 0;
const typeorm_1 = require('typeorm');
class CreateMaterials1631365676792 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new typeorm_1.Table({
        name: 'materials',
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
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'file',
            type: 'varchar',
          },
          {
            name: 'course_id',
            type: 'varchar',
            isNullable: true,
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
      columnNames: ['course_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'courses',
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL',
    });
    await queryRunner.createForeignKey('materials', foreignKey);
  }
  async down(queryRunner) {
    await queryRunner.dropTable('materials');
  }
}
exports.CreateMaterials1631365676792 = CreateMaterials1631365676792;
