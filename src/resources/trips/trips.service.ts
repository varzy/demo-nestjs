import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TripsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTripDto: CreateTripDto) {
    return await this.prismaService.trip.create({ data: createTripDto });
  }

  async findAll(page, size) {
    return await this.prismaService.trip.findMany({ skip: (page - 1) * size, take: size });
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
