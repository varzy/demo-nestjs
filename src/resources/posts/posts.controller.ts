import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';
import { TagsService } from '../tags/tags.service';
import { PostTag } from "../../entities/post-tag.entity";

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
    private readonly tagsService: TagsService,
  ) {}

  @Post()
  async create(
    @Body() createPostDto: CreatePostDto
  ) {
    const tagIds = createPostDto.tags;
    const postTags = tagIds.map(tagId => {
      const postTag = new PostTag();
      postTag.tag_id = tagId;
      return postTag;
    });

    return await this.postsService.create(createPostDto, postTags);
  }

  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.postsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    // const user = await this.usersService.findOne(updatePostDto.user_id);
    // const category = await this.categoriesService.findOne(updatePostDto.category_id);
    // const tags = await this.tagsService.findByIds(updatePostDto.tags);

    return await this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.postsService.remove(id);
  }
}
