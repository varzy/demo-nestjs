import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../../entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    return await this.tagRepository.save(createTagDto);
  }

  async findAll() {
    return await this.tagRepository.find({ relations: ['posts'] });
  }

  async findOne(id: number) {
    const tag = await this.tagRepository.findOne(id);
    if (!tag) throw new NotFoundException();

    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    await this.findOne(id);
    return this.tagRepository.update(id, updateTagDto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.tagRepository.delete(id);
  }

  async findByIds(ids: number[]) {
    return this.tagRepository.findByIds(ids);
  }
}
