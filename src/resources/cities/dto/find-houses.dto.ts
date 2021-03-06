import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FindHousesDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  size?: number = 10;
}
