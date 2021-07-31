import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../../libs/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prismaService.category.create({ data: createCategoryDto });
  }

  async findAll() {
    return await this.prismaService.category.findMany({ include: { posts: true } });
  }

  async findOne(id: number) {
    const category = await this.prismaService.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException();

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.prismaService.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.category.delete({ where: { id } });
  }
}
