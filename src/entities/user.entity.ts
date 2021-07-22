import { Post } from 'src/entities/post.entity';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';

@Entity('users')
export class User extends Base {
  @Column({ type: 'varchar', length: 64 })
  nickname: string;

  @Column({ type: 'varchar', length: 256, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 256, select: false })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @BeforeInsert()
  lowerCaseEmail() {
    this.email = this.email.toLowerCase();
  }
}
