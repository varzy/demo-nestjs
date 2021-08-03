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

@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  async create(@Body() createCityDto: CreateCityDto) {
    return await this.citiesService.create(createCityDto);
  }

  @Get()
  async findAll() {
    return await this.citiesService.findAll();
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

  @Get(':id/houses')
  async findHouses(@Param('id', ParseIntPipe) id: number, @Query() findHousesDto: FindHousesDto) {
    return await this.citiesService.findHouses(id, findHousesDto.page, findHousesDto.size);
  }
}
