import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from '../../libs/prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    return await this.prismaService.tag.create({ data: createTagDto });
  }

  async findAll() {
    return await this.prismaService.tag.findMany({ include: { posts: true } });
  }

  async findOne(id: number) {
    const tag = await this.prismaService.tag.findUnique({ where: { id } });
    if (!tag) throw new NotFoundException();

    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    return this.prismaService.tag.update({ where: { id }, data: updateTagDto });
  }

  async remove(id: number) {
    return this.prismaService.tag.delete({ where: { id } });
  }

  async findByIds(ids: number[]) {
    return this.prismaService.tag.findMany({ where: { id: { in: ids } } });
  }
}
