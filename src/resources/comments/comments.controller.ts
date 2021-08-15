import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtGuard } from '../../guards/jwt.guard';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.create(createCommentDto);
  }

  // @Get()
  // findAll() {
  //   return this.commentsService.findAll();
  // }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.commentsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return await this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.commentsService.remove(+id);
  }
}
