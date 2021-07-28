import { IsUrl, IsNumber, IsString } from 'class-validator';

export class CreateTripDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsUrl()
  cover: string;
}
