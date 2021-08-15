import { IsInt, IsOptional, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterTripsDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  size?: number = 10;

  @IsInt()
  @IsOptional()
  @Max(100)
  @Type(() => Number)
  page?: number = 1;
}
