import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from '../../entities/post.entity';
import { User } from '../../entities/user.entity';
import { Category } from '../../entities/category.entity';
import { Tag } from '../../entities/tag.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, user: User, category: Category, tags: Tag[]) {
    const post = await this.postsRepository.create({ ...createPostDto, user, category, tags });
    return await this.postsRepository.save(post);
  }

  async findAll() {
    return await this.postsRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne(id, { relations: ['user'] });
    if (!post) throw new NotFoundException();

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.findOne(id);
    return await this.postsRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.postsRepository.delete(id);
  }
}
