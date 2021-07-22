import { Column, Entity, JoinColumn, ManyToMany, OneToMany } from "typeorm";
import { PostTag } from './post-tag.entity';
import { Base } from './base.entity';
import { Post } from "./post.entity";

@Entity('tags')
export class Tag extends Base {
  @Column({ type: 'varchar', length: 64, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 128 })
  label: string;

  @OneToMany(() => PostTag, (postTag) => postTag.tag)
  @JoinColumn({ referencedColumnName: 'tag_id' })
  postTags: PostTag[];
}
