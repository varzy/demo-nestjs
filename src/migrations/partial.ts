import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

export const PrimaryId: TableColumnOptions[] = [
  {
    name: 'id',
    type: 'int',
    isPrimary: true,
    isNullable: false,
    unsigned: true,
    isGenerated: true,
    generationStrategy: 'increment',
  },
];

export const CreatedAtAndUpdatedAt: TableColumnOptions[] = [
  { name: 'created_at', type: 'timestamp', default: 'LOCALTIMESTAMP' },
  { name: 'updated_at', type: 'timestamp', default: 'LOCALTIMESTAMP' },
];
