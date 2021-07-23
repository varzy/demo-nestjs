import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './resources/posts/posts.module';
import { UsersModule } from './resources/users/users.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { TagsModule } from './resources/tags/tags.module';
import { HousesModule } from './resources/houses/houses.module';
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [
    // Libs
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
    PrismaModule,
    // Resources
    PostsModule,
    UsersModule,
    CategoriesModule,
    TagsModule,
    HousesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
