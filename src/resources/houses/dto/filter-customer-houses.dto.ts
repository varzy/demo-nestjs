import { OmitType } from '@nestjs/swagger';
import { FilterHousesDto } from './filter-houses.dto';

export class FilterCustomerHousesDto extends OmitType(FilterHousesDto, ['is_active']) {}
