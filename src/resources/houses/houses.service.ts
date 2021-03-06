import { Injectable } from '@nestjs/common';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { PrismaService } from '../../libs/prisma/prisma.service';
import { FilterHousesDto } from './dto/filter-houses.dto';

@Injectable()
export class HousesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createHouseDto: CreateHouseDto) {
    return await this.prismaService.house.create({ data: createHouseDto });
  }

  async findAll(filterHousesDto: FilterHousesDto) {
    const where: any = {};
    if (filterHousesDto.title) where.title = { startsWith: filterHousesDto.title };
    if (filterHousesDto.is_active) where.is_active = filterHousesDto.is_active;

    return {
      ...filterHousesDto,
      total: await this.prismaService.house.count(),
      list: await this.prismaService.house.findMany({
        where,
        include: { city: true },
        orderBy: { created_at: 'desc' },
        ...this.prismaService.withPagination(filterHousesDto),
      }),
    };
  }

  async findOne(id: number) {
    return await this.prismaService.house.findUnique({ where: { id }, include: { city: true } });
  }

  async update(id: number, updateHouseDto: UpdateHouseDto) {
    return await this.prismaService.house.update({ where: { id }, data: updateHouseDto });
  }

  async remove(id: number) {
    return await this.prismaService.house.delete({ where: { id } });
  }
}
