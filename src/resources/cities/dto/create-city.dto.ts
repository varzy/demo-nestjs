import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCityDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  is_active?: number = 1;
}
