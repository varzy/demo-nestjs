import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterPostsDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  size: number;
}
