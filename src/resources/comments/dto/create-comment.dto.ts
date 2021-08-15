import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  /**
   * 评论所属
   */
  @IsString()
  @IsIn(['post'])
  topic: string;

  /**
   * 话题 id
   */
  @IsNumber()
  topic_id: number;

  /**
   * 父评论 id。为 0 时表示顶级评论
   */
  @IsNumber()
  @IsOptional()
  parent_id?: number;

  /**
   * 要回复的子评论 id。为 0 时表示没有回复对象
   */
  @IsNumber()
  @IsOptional()
  to_reply_id?: number;

  @IsString()
  body: string;
}
