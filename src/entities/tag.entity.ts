import { Column, Entity, OneToMany } from 'typeorm';
import { PostTag } from './post-tag.entity';
import { Base } from './base.entity';

@Entity('tags')
export class Tag extends Base {
  @Column({ type: 'varchar', length: 64, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 128 })
  label: string;

  // @ManyToMany(() => Post, (post) => post.tags)
  // posts: Post[];

  @OneToMany(() => PostTag, (postTag) => postTag.tag)
  posts: PostTag[];
}
