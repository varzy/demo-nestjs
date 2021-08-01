import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../../libs/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    return this.prismaService.role.create({ data: createRoleDto });
  }

  async findAll() {
    return this.prismaService.role.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.role.findUnique({ where: { id } });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.prismaService.role.update({ where: { id }, data: updateRoleDto });
  }

  async remove(id: number) {
    return this.prismaService.role.delete({ where: { id } });
  }
}
