import { IsArray, IsNumber, IsString, Validate } from 'class-validator';
import { RequireFieldExist } from '../../../validations/require-field-exist.validation';

export class CreatePostDto {
  @IsNumber()
  @Validate(RequireFieldExist, ['users', 'id'])
  readonly author_id: number;

  @IsNumber()
  @Validate(RequireFieldExist, ['categories', 'id'])
  readonly category_id: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly body: string;

  @IsArray()
  readonly tags: [];
}
