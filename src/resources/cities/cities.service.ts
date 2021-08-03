import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { PrismaService } from '../../libs/prisma/prisma.service';
import { FindHousesDto } from './dto/find-houses.dto';
import { ReorderDto } from './dto/reorder.dto';
import { FilterCitiesDto } from './dto/filter-cities.dto';

@Injectable()
export class CitiesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCityDto: CreateCityDto) {
    return await this.prismaService.city.create({ data: createCityDto });
  }

  async findAll(filterCitiesDto: FilterCitiesDto) {
    const where: any = {};
    if (filterCitiesDto.is_top) where.is_top = filterCitiesDto.is_top;
    return await this.prismaService.city.findMany({ where, orderBy: { order: 'desc' } });
  }

  async findOne(id: number) {
    return await this.prismaService.city.findUnique({ where: { id } });
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    const city = await this.findOne(id);
    // 如果取消置顶，则把排序置空
    const is_top = updateCityDto.is_top ?? city.is_top;
    const order = is_top ? updateCityDto.order ?? city.order : -1;

    return await this.prismaService.city.update({ where: { id }, data: { ...updateCityDto, order: order, is_top: is_top } });
  }

  async remove(id: number) {
    return await this.prismaService.city.delete({ where: { id } });
  }

  async findHouses(id: number, findHousesDto: FindHousesDto) {
    return await this.prismaService.city
      .findUnique({ where: { id } })
      .houses({ take: findHousesDto.size, ...this.prismaService.withPagination(findHousesDto) });
  }

  async reorder(reorderDto: ReorderDto) {
    const orderList = reorderDto.list;
    const queries = orderList.map((orderItem) =>
      this.prismaService.city.update({
        where: { id: orderItem.id },
        data: { order: orderItem.order },
      }),
    );

    return await this.prismaService.$transaction(queries);
  }
}
