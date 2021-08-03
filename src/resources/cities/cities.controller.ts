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
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { FindHousesDto } from './dto/find-houses.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReorderDto } from './dto/reorder.dto';
import { FilterCitiesDto } from './dto/filter-cities.dto';

@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  async create(@Body() createCityDto: CreateCityDto) {
    return await this.citiesService.create(createCityDto);
  }

  @Get()
  async findAll(@Query() filterCitiesDto: FilterCitiesDto) {
    return await this.citiesService.findAll(filterCitiesDto);
  }

  @Post('reorder')
  async reorder(@Body() reorderDto: ReorderDto) {
    return await this.citiesService.reorder(reorderDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.citiesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCityDto: UpdateCityDto) {
    return await this.citiesService.update(id, updateCityDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.citiesService.remove(id);
  }

  /**
   * 获取某个城市的房源列表
   * @param id
   * @param findHousesDto
   */
  @Get(':id/houses')
  async findHouses(@Param('id', ParseIntPipe) id: number, @Query() findHousesDto: FindHousesDto) {
    return await this.citiesService.findHouses(id, findHousesDto);
  }
}
