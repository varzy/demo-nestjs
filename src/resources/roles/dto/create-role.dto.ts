import { IsString } from 'class-validator';
import { FieldUnique } from '../../../libs/validations/field-unique.validator';

export class CreateRoleDto {
  @IsString()
  @FieldUnique({ table: 'roles' })
  name: string;

  @IsString()
  @FieldUnique({ table: 'roles' })
  label: string;
}
