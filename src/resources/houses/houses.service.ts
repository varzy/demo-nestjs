import { Injectable } from '@nestjs/common';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { PrismaService } from '../../libs/prisma/prisma.service';

@Injectable()
export class HousesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createHouseDto: CreateHouseDto) {
    return await this.prismaService.house.create({ data: createHouseDto });
  }

  async findAll() {
    return await this.prismaService.house.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.house.findUnique({ where: { id } });
  }

  async update(id: number, updateHouseDto: UpdateHouseDto) {
    return await this.prismaService.house.update({ where: { id }, data: updateHouseDto });
  }

  async remove(id: number) {
    return await this.prismaService.house.delete({ where: { id } });
  }
}
