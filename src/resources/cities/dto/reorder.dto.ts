import { IsArray } from 'class-validator';

export interface ReorderItem {
  id: number;
  order: number;
}

export class ReorderDto {
  @IsArray()
  list: ReorderItem[];
}
