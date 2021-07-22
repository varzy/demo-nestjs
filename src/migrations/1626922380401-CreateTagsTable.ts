import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { CreatedAtAndUpdatedAt, PrimaryId } from './partial';

export class CreateTagsTable1626922380401 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tags',
        columns: [
          ...PrimaryId,
          { name: 'name', type: 'varchar', length: '64', isUnique: true },
          { name: 'label', type: 'varchar', length: '128' },
          ...CreatedAtAndUpdatedAt,
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tags');
  }
}
