import { IsArray, IsNumber, IsString } from 'class-validator';
import { FieldExist } from '../../../libs/validations/field-exist.validator';
import { FieldIn } from '../../../libs/validations/field-in.validator';

export class CreatePostDto {
  @IsNumber()
  @FieldExist({ table: 'users', field: 'id' })
  readonly author_id: number;

  @IsNumber()
  @FieldExist({ table: 'categories', field: 'id' })
  readonly category_id: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly body: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @FieldIn({ table: 'tags', field: 'id' })
  readonly tags: [];
}
