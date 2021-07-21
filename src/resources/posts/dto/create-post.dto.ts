import { IsNumberString, IsString, Validate } from 'class-validator';
import { RequireFieldExist } from '../../../validations/require-field-exist.validation';

export class CreatePostDto {
  @IsNumberString()
  @Validate(RequireFieldExist, ['users', 'id'])
  readonly user_id: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly body: string;

  @IsNumberString()
  readonly category_id: number;
}
