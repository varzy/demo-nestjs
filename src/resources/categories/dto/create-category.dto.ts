import { IsAlphanumeric, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsAlphanumeric()
  @MaxLength(64)
  name: string;

  @IsString()
  @MaxLength(128)
  label: string;
}
