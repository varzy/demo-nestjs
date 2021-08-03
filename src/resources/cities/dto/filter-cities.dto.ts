import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterCitiesDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  is_top?: number;
}
