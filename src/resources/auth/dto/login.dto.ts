import { IsEmail, IsString, Validate } from 'class-validator';
import { RequireFieldExist } from '../../../validations/require-field-exist.validation';

export class LoginDto {
  @IsEmail()
  @Validate(RequireFieldExist, ['users', 'email'])
  email: string;

  @IsString()
  password: string;
}
