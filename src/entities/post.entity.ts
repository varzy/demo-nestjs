import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, JoinTable } from "typeorm";
import { User } from './user.entity';
import { Category } from './category.entity';
import { PostTag } from './post-tag.entity';
import { Base } from './base.entity';

@Entity('posts')
export class Post extends Base {
  @Column({ type: 'int', unsigned: true })
  user_id: number;

  @Column({ type: 'int', unsigned: true })
  category_id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  body: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Category, (category) => category.posts)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => PostTag, (postTag) => postTag.post)
  @JoinColumn({ referencedColumnName: 'post_id' })
  postTags: PostTag[];
}
