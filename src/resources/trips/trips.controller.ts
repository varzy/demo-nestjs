import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { FilterTripsDto } from './dto/filter-trips.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  async create(@Body() createTripDto: CreateTripDto) {
    return await this.tripsService.create(createTripDto);
  }

  @Get()
  async findAll(@Query() filterTripsDto: FilterTripsDto) {
    return await this.tripsService.findAll(filterTripsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.tripsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateTripDto: UpdateTripDto) {
    return await this.tripsService.update(id, updateTripDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.tripsService.remove(id);
  }
}
