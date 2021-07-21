import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoriesRepository.save(createCategoryDto);
  }

  async findAll() {
    return await this.categoriesRepository.find({ relations: ['posts'] });
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOne(id);
    if (!category) throw new NotFoundException();

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);
    return this.categoriesRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.categoriesRepository.delete(id);
  }
}
