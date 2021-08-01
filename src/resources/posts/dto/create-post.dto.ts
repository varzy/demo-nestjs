import { IsArray, IsNumber, IsString } from 'class-validator';
import { FieldExist } from '../../../libs/validations/field-exist.validator';
import { FieldIn } from '../../../libs/validations/field-in.validator';

export class CreatePostDto {
  @IsNumber()
  @FieldExist({ table: 'users', field: 'id' })
  author_id: number;

  @IsNumber()
  @FieldExist({ table: 'categories', field: 'id' })
  category_id: number;

  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @FieldIn({ table: 'tags', field: 'id' })
  tags: [];
}
