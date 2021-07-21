import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.entity';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, user: User) {
    const post = await this.postsRepository.create(createPostDto);
    post.user = user;
    return this.postsRepository.save(post);
  }

  async findAll() {
    return await this.postsRepository.find();
  }

  async findOne(id: number) {
    return this.postsRepository.findOneOrFail(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postsRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    return await this.postsRepository.delete(id);
  }
}
