import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from '../../entities/post.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, user: User) {
    const post = await this.postsRepository.create({ ...createPostDto, user });
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
    const post = await this.findOne(id);
    if (!post) throw new NotFoundException();

    return await this.postsRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    if (!post) return new NotFoundException();

    return await this.postsRepository.delete(id);
  }
}
