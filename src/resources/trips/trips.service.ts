import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { PrismaService } from '../../libs/prisma/prisma.service';
import { FilterTripsDto } from './dto/filter-trips.dto';

@Injectable()
export class TripsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTripDto: CreateTripDto) {
    return await this.prismaService.trip.create({ data: createTripDto });
  }

  async findAll(filterTripsDto: FilterTripsDto) {
    return {
      ...filterTripsDto,
      total: await this.prismaService.trip.count(),
      list: await this.prismaService.trip.findMany({
        ...this.prismaService.withPagination(filterTripsDto),
        orderBy: { created_at: 'desc' },
      }),
    };
  }

  async findOne(id: number) {
    return await this.prismaService.trip.findUnique({ where: { id } });
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    return await this.prismaService.trip.update({ where: { id }, data: updateTripDto });
  }

  async remove(id: number) {
    return await this.prismaService.trip.delete({ where: { id } });
  }
}
