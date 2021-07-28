import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    return await this.prismaService.post.create({
      data: {
        title: createPostDto.title,
        body: createPostDto.body,
        author: { connect: { id: createPostDto.author_id } },
        category: { connect: { id: createPostDto.category_id } },
        tags: {
          create: createPostDto.tags.map((tagId) => ({
            tag: { connect: { id: tagId } },
          })),
        },
      },
      include: { author: true, category: true, tags: true },
    });
  }

  async findAll() {
    return await this.prismaService.post.findMany({
      include: { author: true, category: true, tags: true },
    });
  }

  async findOne(id: number) {
    const post = await this.prismaService.post.findUnique({
      where: { id },
      include: { author: true, category: true, tags: true },
    });
    if (!post) throw new NotFoundException();

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    // @TODO: 需要解决多对多更新的问题

    if (updatePostDto.tags) {
      updatePostDto.tags.map(async (tagId) => {
        await this.prismaService.postTag.update({ where: { id }, data: { tag_id: tagId } });
      });
    }

    return await this.prismaService.post.update({
      where: { id },
      data: {
        title: updatePostDto.title,
        body: updatePostDto.body,
        author: { connect: { id: updatePostDto.author_id } },
        category: { connect: { id: updatePostDto.category_id } },
        // tags: { set: updatePostDto.tags?.map((tagId) => ({ tag: { connect:tagId } })) },
      },
      include: { author: true, category: true, tags: true },
    });
  }

  async remove(id: number) {
    return await this.prismaService.post.delete({ where: { id } });
  }
}
