import { Column, Entity, OneToMany } from 'typeorm';
import { Post } from './post.entity';
import { Base } from './base.entity';

@Entity('categories')
export class Category extends Base {
  @Column({ type: 'varchar', length: 64, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 128 })
  label: string;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
