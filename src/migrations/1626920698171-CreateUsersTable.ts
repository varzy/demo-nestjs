import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { CreatedAtAndUpdatedAt, PrimaryId } from './partial';

export class CreateUsersTable1626920698171 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          ...PrimaryId,
          { name: 'nickname', type: 'varchar', length: '64' },
          { name: 'email', type: 'varchar', isUnique: true },
          { name: 'password', type: 'varchar' },
          ...CreatedAtAndUpdatedAt,
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
