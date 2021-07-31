import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class FieldInValidator implements ValidatorConstraintInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async validate(value: Array<number | string>, args: ValidationArguments) {
    const { table, field = args.property } = args.constraints[0];
    const formattedValues = value
      .map((item: any) => (typeof item === 'number' ? item : `'${item}'`))
      .join(', ');
    const [countCtx] = await this.prismaService.$queryRaw(
      `SELECT COUNT(${field}) FROM ${table} WHERE ${field} IN (${formattedValues});`,
    );

    return Object.values(countCtx)[0] === value.length;
  }

  defaultMessage(args: ValidationArguments) {
    const { table, field = args.property } = args.constraints[0];
    return `The value of ${field} must in ${table} ${field}.`;
  }
}

export function FieldIn(
  params: { table: string; field?: string },
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [params],
      validator: FieldInValidator,
    });
  };
}
