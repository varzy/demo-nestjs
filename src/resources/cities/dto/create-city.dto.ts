import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCityDto {
  @IsString()
  name: string;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsInt()
  @IsIn([0, 1])
  @IsOptional()
  is_top?: number;
}
