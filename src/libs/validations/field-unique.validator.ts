import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';

@ValidatorConstraint({ async: true })
export class FieldUniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async validate(value: string | number, args: ValidationArguments) {
    const { table, field = args.property } = args.constraints[0];
    const formattedValue = typeof value === 'number' ? value : `'${value}'`;
    const result = await this.prismaService.$queryRaw(
      `SELECT * FROM ${table} WHERE ${field} = ${formattedValue} LIMIT 1;`,
    );

    return !result.length;
  }

  defaultMessage(args: ValidationArguments) {
    const { table, field = args.property } = args.constraints[0];
    return `The ${field} must be unique in table ${table}.`;
  }
}

export function FieldUnique(
  params: { table: string; field?: string },
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [params],
      validator: FieldUniqueValidator,
    });
  };
}
