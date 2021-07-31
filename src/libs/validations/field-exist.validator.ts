import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class FieldExistValidator implements ValidatorConstraintInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async validate(value: number | string, args: ValidationArguments) {
    const { table, field = args.property } = args.constraints[0];
    const formattedValue = typeof value === 'number' ? value : `'${value}'`;
    const result = await this.prismaService.$queryRaw(
      `SELECT * FROM ${table} WHERE ${field} = ${formattedValue} LIMIT 1;`,
    );

    return !!result.length;
  }

  defaultMessage(args: ValidationArguments) {
    const { table, field = args.property } = args.constraints[0];
    return `The ${args.property} is not existed in table ${table} of ${field}.`;
  }
}

export function FieldExist(
  params: { table: string; field?: string },
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [params],
      validator: FieldExistValidator,
    });
  };
}
