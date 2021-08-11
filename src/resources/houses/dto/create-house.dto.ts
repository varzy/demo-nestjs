import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateHouseDto {
  @IsInt()
  city_id: number;

  @IsString()
  title: string;

  /**
   * 1: 整套公寓; 2: 整间 LOFT; 3: 整套客房; 4: 自如短租
   */
  @IsInt()
  @IsIn([1, 2, 3, 4])
  type: number;

  @IsInt()
  bed_num: number;

  @IsInt()
  price: number;

  @IsInt()
  @IsOptional()
  current_price?: number;

  @IsString()
  cover: string;

  /**
   * 从 1 - 10，每档 0.5 星。1 = 半星，10 = 五星
   */
  @IsInt()
  @Min(1)
  @Max(10)
  rating: number;

  /**
   * 0: 已下架; 1: 已上架
   */
  @IsInt()
  @IsOptional()
  is_active?: number;
}
