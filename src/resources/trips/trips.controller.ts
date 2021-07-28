import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  findAll(@Query('page', ParseIntPipe) page = 1, @Query('size', ParseIntPipe) size = 10) {
    return this.tripsService.findAll(page, size);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tripsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(id, updateTripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tripsService.remove(id);
  }
}
