import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../../libs/prisma/prisma.service';
import { COMMENT_TOPICS } from '../../config/comment.config';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    return await this.prismaService.comment.create({ data: createCommentDto });
  }

  async findTopicComments(topic: COMMENT_TOPICS, topicId: number) {
    return await this.prismaService[topic].findUnique({ where: { id: topicId } });
  }

  // findAll() {
  //   return `This action returns all comments`;
  // }

  async findOne(id: number) {
    return await this.prismaService.comment.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return await updateCommentDto;
  }

  async remove(id: number) {
    return await `This action removes a #${id} comment`;
  }
}
