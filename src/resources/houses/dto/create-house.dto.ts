import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHouseDto {
  @IsNumber()
  city_id: number;

  @IsString()
  title: string;

  /**
   * 1: 整套公寓
   * 2: 整间 LOFT
   * 3: 整套客房
   * 4: 自如短租
   */
  @IsNumber()
  type: number;

  @IsNumber()
  bed_num: number;

  @IsNumber()
  price: number;

  @IsNumber()
  @IsOptional()
  current_price?: number;

  @IsString()
  cover: string;

  @IsNumber()
  rating: number;

  @IsNumber()
  @IsOptional()
  is_active?: number;
}
