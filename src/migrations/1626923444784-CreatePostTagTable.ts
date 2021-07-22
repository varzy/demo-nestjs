import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { CreatedAtAndUpdatedAt, PrimaryId } from './partial';

export class CreatePostTagTable1626923444784 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'post_tag',
        columns: [
          ...PrimaryId,
          { name: 'post_id', type: 'int', unsigned: true },
          { name: 'tag_id', type: 'int', unsigned: true },
          ...CreatedAtAndUpdatedAt,
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('post_tag');
  }
}
