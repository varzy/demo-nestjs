import { IsInt, IsOptional, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterPostsDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsInt()
  @IsOptional()
  @Max(100)
  @Type(() => Number)
  size?: number = 10;
}
