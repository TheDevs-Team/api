import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateStudentsCourses1631365901666 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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

    const foreignKeyCourse = new TableForeignKey({
      columnNames: ['course_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'courses',
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL',
    });

    await queryRunner.createForeignKey('studentsCourses', foreignKeyCourse);

    queryRunner.clearSqlMemory();

    const foreignKeyUser = new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL',
    });

    await queryRunner.createForeignKey('studentsCourses', foreignKeyUser);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('studentsCourses');
  }
}
