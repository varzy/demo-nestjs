import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { PostTag } from './post-tag.entity';
import { Base } from './base.entity';

@Entity('posts')
export class Post extends Base {
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
  tags: PostTag[];
}
