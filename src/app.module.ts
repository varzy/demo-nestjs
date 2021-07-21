import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './resources/posts/posts.module';
import { UsersModule } from './resources/users/users.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { TagsModule } from './resources/tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
    PostsModule,
    UsersModule,
    CategoriesModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
