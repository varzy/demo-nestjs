import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@ValidatorConstraint({ async: true })
export class RequireFieldExist implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const [table, field] = args.constraints;
    const result = await prisma.$queryRaw(
      `SELECT * FROM ${table} WHERE ${field} = ${value} LIMIT 1;`,
    );

    return !!result.length;
  }

  defaultMessage(args: ValidationArguments) {
    const [table, filed] = args.constraints;
    return `The ${args.property} is not existed in table ${table} of ${filed}.`;
  }
}
