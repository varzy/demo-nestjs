import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { PrismaService } from '../../libs/prisma/prisma.service';

@Injectable()
export class CitiesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCityDto: CreateCityDto) {
    return await this.prismaService.city.create({ data: createCityDto });
  }

  async findAll() {
    return await this.prismaService.city.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.city.findUnique({ where: { id } });
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    return await this.prismaService.city.update({ where: { id }, data: updateCityDto });
  }

  async remove(id: number) {
    return await this.prismaService.city.delete({ where: { id } });
  }
}
