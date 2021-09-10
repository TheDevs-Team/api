import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateMaterials1631305045744 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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

    const foreignKey = new TableForeignKey({
      columnNames: ['course_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'courses',
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL',
    });

    await queryRunner.createForeignKey('materials', foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('materials');
  }
}
