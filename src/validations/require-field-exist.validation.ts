import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getConnection } from 'typeorm';

@ValidatorConstraint({ async: true })
export class RequireFieldExist implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const [table, field] = args.constraints;
    const connection = await getConnection();
    const rawData = await connection.query(`SELECT * FROM ${table} WHERE ${field} = ${value}`);

    return !!rawData.length;
  }

  defaultMessage(args: ValidationArguments) {
    const [table, filed] = args.constraints;
    // here you can provide default error message if validation failed
    return `The ${filed} is not existed in table ${table}.`;
  }
}
