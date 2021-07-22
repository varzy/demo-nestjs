import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from './base.entity';
import { Post } from './post.entity';
import { Tag } from './tag.entity';

@Entity('post_tag')
export class PostTag extends Base {
  @Column({ type: 'int', unsigned: true })
  post_id: number;

  @Column({ type: 'int', unsigned: true })
  tag_id: number;

  @ManyToOne(() => Tag, (tag) => tag.posts)
  @JoinColumn({ name: 'post_id' })
  tag: Tag;

  @ManyToOne(() => Post, (post) => post.tags)
  @JoinColumn({ name: 'tag_id' })
  post: Post;
}
