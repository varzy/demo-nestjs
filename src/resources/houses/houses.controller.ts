import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterHousesDto } from './dto/filter-houses.dto';
import { FilterCustomerHousesDto } from './dto/filter-customer-houses.dto';

@ApiTags('Houses')
@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @Post()
  async create(@Body() createHouseDto: CreateHouseDto) {
    return await this.housesService.create(createHouseDto);
  }

  @Get()
  async findAll(@Query() filterHousesDto: FilterHousesDto) {
    return await this.housesService.findAll(filterHousesDto);
  }

  /**
   * 获取用户端使用的未下架的房源列表
   * @param filterCustomerHousesDto
   */
  @Get('customers')
  async findForCustomers(@Query() filterCustomerHousesDto: FilterCustomerHousesDto) {
    return await this.housesService.findAll({ ...filterCustomerHousesDto, is_active: 1 });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.housesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateHouseDto: UpdateHouseDto) {
    return await this.housesService.update(id, updateHouseDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.housesService.remove(id);
  }
}
