import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { CreatedAtAndUpdatedAt, PrimaryId } from './partial';

export class CreatePostsTable1626921698087 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'posts',
        columns: [
          ...PrimaryId,
          { name: 'user_id', type: 'int', unsigned: true },
          { name: 'category_id', type: 'int', unsigned: true },
          { name: 'title', type: 'varchar' },
          { name: 'body', type: 'text' },
          ...CreatedAtAndUpdatedAt,
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('posts');
  }
}
