import { IsNumber, IsOptional } from 'class-validator';

export class FindHousesDto {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  size?: number;
}
